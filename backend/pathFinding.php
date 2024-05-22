<?php

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$walls = $data['walls'];
$start = ['x' => 0, 'y' => 0];
$end = ['x' => 9, 'y' => 9];
$rows = 10;
$cols = 10;

function heuristic($a, $b) {
    return abs($a['x'] - $b['x']) + abs($a['y'] - $b['y']);
}

function getNeighbors($node) {
    global $rows, $cols;
    $directions = [
        ['x' => -1, 'y' => 0],
        ['x' => 1, 'y' => 0],
        ['x' => 0, 'y' => -1],
        ['x' => 0, 'y' => 1]
    ];
    $neighbors = [];
    foreach ($directions as $direction) {
        $x = $node['x'] + $direction['x'];
        $y = $node['y'] + $direction['y'];
        if ($x >= 0 && $x < $rows && $y >= 0 && $y < $cols) {
            $neighbors[] = ['x' => $x, 'y' => $y];
        }
    }
    return $neighbors;
}

function aStar($start, $end, $walls) {
    $openSet = [];
    $closedSet = [];
    $startNode = ['x' => $start['x'], 'y' => $start['y'], 'g' => 0, 'h' => heuristic($start, $end), 'f' => 0, 'parent' => null];
    $startNode['f'] = $startNode['g'] + $startNode['h'];
    $openSet[] = $startNode;

    while (!empty($openSet)) {
        usort($openSet, function($a, $b) {
            return $a['f'] - $b['f'];
        });

        $currentNode = array_shift($openSet);
        if ($currentNode['x'] === $end['x'] && $currentNode['y'] === $end['y']) {
            $path = [];
            $temp = $currentNode;
            while ($temp) {
                $path[] = $temp;
                $temp = $temp['parent'];
            }
            return array_reverse($path);
        }

        $closedSet[] = $currentNode;
        foreach (getNeighbors($currentNode) as $neighbor) {
            if (in_array($neighbor, $walls) || in_array($neighbor, $closedSet)) {
                continue;
            }

            $tentative_g = $currentNode['g'] + 1;
            $existingNode = null;
            foreach ($openSet as $node) {
                if ($node['x'] === $neighbor['x'] && $node['y'] === $neighbor['y']) {
                    $existingNode = $node;
                    break;
       
