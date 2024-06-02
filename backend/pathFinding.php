<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $start = $data['start'];
    $end = $data['end'];
    $walls = $data['walls'];

    $path = findPath($start, $end, $walls);

    echo json_encode($path);
    exit;
}

function findPath($start, $end, $walls) {
    $openSet = [$start];
    $closedSet = [];
    $cameFrom = [];

    $gScore = [];
    $fScore = [];

    $rows = 5; // Define the number of rows
    $cols = 5; // Define the number of columns

    foreach ($openSet as $cell) {
        $gScore[$cell['x']][$cell['y']] = INF;
        $fScore[$cell['x']][$cell['y']] = INF;
    }

    $gScore[$start['x']][$start['y']] = 0;
    $fScore[$start['x']][$start['y']] = heuristicCostEstimate($start, $end);

    while (!empty($openSet)) {
        $current = getLowestFScore($openSet, $fScore);
        if ($current == $end) {
            return reconstructPath($cameFrom, $current);
        }

        $openSet = removeElement($openSet, $current);
        $closedSet[] = $current;

        $neighbors = getNeighbors($current, $walls, $rows, $cols);
        foreach ($neighbors as $neighbor) {
            if (in_array($neighbor, $closedSet)) {
                continue;
            }

            $tentativeGScore = $gScore[$current['x']][$current['y']] + 1;

            if (!in_array($neighbor, $openSet)) {
                $openSet[] = $neighbor;
            } elseif ($tentativeGScore >= $gScore[$neighbor['x']][$neighbor['y']]) {
                continue;
            }

            $cameFrom[$neighbor['x']][$neighbor['y']] = $current;
            $gScore[$neighbor['x']][$neighbor['y']] = $tentativeGScore;
            $fScore[$neighbor['x']][$neighbor['y']] = $gScore[$neighbor['x']][$neighbor['y']] + heuristicCostEstimate($neighbor, $end);
        }
    }

    return [];
}

function heuristicCostEstimate($start, $end) {
    return abs($start['x'] - $end['x']) + abs($start['y'] - $end['y']);
}

function getLowestFScore($openSet, $fScore) {
    $lowestFScore = INF;
    $lowestFScoreCell = null;

    foreach ($openSet as $cell) {
        if ($fScore[$cell['x']][$cell['y']] < $lowestFScore) {
            $lowestFScore = $fScore[$cell['x']][$cell['y']];
            $lowestFScoreCell = $cell;
        }
    }

    return $lowestFScoreCell;
}

function removeElement($array, $element) {
    $index = array_search($element, $array);
    if ($index!== false) {
        array_splice($array, $index, 1);
    }
    return $array;
}

function getNeighbors($cell, $walls, $rows, $cols) {
    $neighbors = [];

    $x = $cell['x'];
    $y = $cell['y'];

    $possibleNeighbors = [
        ['x' => $x - 1, 'y' => $y],
        ['x' => $x + 1, 'y' => $y],
        ['x' => $x, 'y' => $y - 1],
        ['x' => $x, 'y' => $y + 1]
    ];

    foreach ($possibleNeighbors as $neighbor) {
        if ($neighbor['x'] >= 0 && $neighbor['x'] < $rows && $neighbor['y'] >= 0 && $neighbor['y'] < $cols &&!in_array($neighbor, $walls)) {
            $neighbors[] = $neighbor;
        }
    }

    return $neighbors;
}

function reconstructPath($cameFrom, $current) {
    $path = [$current];

    while (isset($cameFrom[$current['x']][$current['y']])) {
        $current = $cameFrom[$current['x']][$current['y']];
        $path[] = $current;
    }

    return array_reverse($path);
}
?>
