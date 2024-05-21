whatever, nie działa losowanie przeszkód, ale działa rysowanie ścieżki

<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            border-collapse: collapse;
        }
        td {
            width: 30px;
            height: 30px;
            text-align: center;
            border: 1px solid black;
            cursor: pointer;
        }
        .start {
            background-color: lightgreen;
        }
        .end {
            background-color: lightcoral;
        }
        .path {
            background-color: lightblue;
        }
        .obstacle {
            background-color: gray;
        }
    </style>
    <script>
        let start = null;
        let end = null;
        let obstacles = [];

        function cellClick(x, y) {
            const cell = document.getElementById(`cell-${x}-${y}`);
            if (!start) {
                setStart(cell, x, y);
            } else if (!end) {
                setEnd(cell, x, y);
                findPath();
            } else {
                toggleObstacle(cell, x, y);
            }
        }

        function setStart(cell, x, y) {
            start = [x, y];
            cell.classList.add('start');
        }

        function setEnd(cell, x, y) {
            end = [x, y];
            cell.classList.add('end');
        }

        function toggleObstacle(cell, x, y) {
            const index = obstacles.findIndex(([ox, oy]) => ox === x && oy === y);
            if (index > -1) {
                obstacles.splice(index, 1);
                cell.classList.remove('obstacle');
            } else {
                obstacles.push([x, y]);
                cell.classList.add('obstacle');
            }
        }

        function resetBoard() {
            start = null;
            end = null;
            obstacles = [];
            const cells = document.querySelectorAll('td');
            cells.forEach(cell => {
                cell.classList.remove('start', 'end', 'path', 'obstacle');
            });
        }

        function findPath() {
            if (start && end) {
                const obstacleQuery = obstacles.map(([ox, oy]) => `${ox},${oy}`).join(';');
                window.location.href = `?start=${start.join(',')}&end=${end.join(',')}&obstacles=${obstacleQuery}`;
            }
        }
    </script>
</head>
<body>
    <button onclick="resetBoard()">Reset Board</button>
    <?php

    class Chessboard {
        private $boardSize;
        private $directions;

        public function __construct($size) {
            $this->boardSize = $size;
            $this->directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // Right, Down, Left, Up
        }

        public function isValid($x, $y, $obstacles) {
            return $x >= 0 && $x < $this->boardSize && $y >= 0 && $y < $this->boardSize && !$obstacles[$x][$y];
        }

        public function bfs($start, $end, $obstacles) {
            $queue = [];
            $visited = [];
            $prev = [];

            for ($i = 0; $i < $this->boardSize; $i++) {
                for ($j = 0; $j < $this->boardSize; $j++) {
                    $visited[$i][$j] = false;
                    $prev[$i][$j] = null;
                }
            }

            list($sx, $sy) = $start;
            list($ex, $ey) = $end;

            array_push($queue, [$sx, $sy]);
            $visited[$sx][$sy] = true;

            while (!empty($queue)) {
                list($x, $y) = array_shift($queue);

                if ($x == $ex && $y == $ey) {
                    return $this->reconstructPath($prev, $start, $end);
                }

                foreach ($this->directions as $dir) {
                    $nx = $x + $dir[0];
                    $ny = $y + $dir[1];

                    if ($this->isValid($nx, $ny, $obstacles) && !$visited[$nx][$ny]) {
                        array_push($queue, [$nx, $ny]);
                        $visited[$nx][$ny] = true;
                        $prev[$nx][$ny] = [$x, $y];
                    }
                }
            }

            return [];
        }

        private function reconstructPath($prev, $start, $end) {
            $path = [];
            list($x, $y) = $end;

            while ($prev[$x][$y] !== null) {
                array_unshift($path, [$x, $y]);
                list($x, $y) = $prev[$x][$y];
            }

            array_unshift($path, $start);
            return $path;
        }

        public function visualizePath($path, $start, $end, $obstacles) {
            $grid = array_fill(0, $this->boardSize, array_fill(0, $this->boardSize, '0'));

            foreach ($path as $step) {
                list($x, $y) = $step;
                $grid[$x][$y] = 'X';
            }

            list($sx, $sy) = $start;
            list($ex, $ey) = $end;

            echo '<table>';
            for ($i = 0; $i < $this->boardSize; $i++) {
                echo '<tr>';
                for ($j = 0; $j < $this->boardSize; $j++) {
                    $class = '';
                    if ($i == $sx && $j == $sy) {
                        $class = 'start';
                    } elseif ($i == $ex && $j == $ey) {
                        $class = 'end';
                    } elseif ($grid[$i][$j] == 'X') {
                        $class = 'path';
                    } elseif (isset($obstacles[$i][$j]) && $obstacles[$i][$j]) {
                        $class = 'obstacle';
                    }
                    echo "<td id='cell-{$i}-{$j}' class='{$class}' onclick='cellClick({$i}, {$j})'>{$grid[$i][$j]}</td>";
                }
                echo '</tr>';
            }
            echo '</table>';
        }
    }

    function getParameter($key) {
        return isset($_GET[$key]) ? explode(',', $_GET[$key]) : null;
    }

    $start = getParameter('start');
    $end = getParameter('end');
    $obstacles = isset($_GET['obstacles']) ? array_map(function($coord) {
        return explode(',', $coord);
    }, explode(';', $_GET['obstacles'])) : [];

    $obstacleGrid = array_fill(0, 4, array_fill(0, 4, false));
    foreach ($obstacles as $obstacle) {
        if (count($obstacle) == 2) {
            list($ox, $oy) = $obstacle;
            $obstacleGrid[$ox][$oy] = true;
        }
    }

    $chessboard = new Chessboard(4);
    $path = [];

    if ($start && count($start) == 2 && $end && count($end) == 2) {
        $path = $chessboard->bfs($start, $end, $obstacleGrid);
    }

    $chessboard->visualizePath($path, $start, $end, $obstacleGrid);
    ?>
</body>
</html>
