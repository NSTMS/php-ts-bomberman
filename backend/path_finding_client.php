<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Path Finding App</title>
    <style>
        .grid {
            display: grid;
            grid-template-columns: repeat(10, 30px);
            gap: 2px;
        }
        .cell {
            width: 30px;
            height: 30px;
            border: 1px solid #ccc;
            text-align: center;
            line-height: 30px;
        }
        .start {
            background-color: green;
        }
        .end {
            background-color: red;
        }
        .path {
            background-color: yellow;
        }
        .wall {
            background-color: black;
        }
    </style>
</head>
<body>
    <h1>Path Finding App</h1>
    <div class="grid" id="grid"></div>
    <button onclick="findPath()">Find Path</button>
    <script>
        const rows = 10;
        const cols = 10;
        const gridElement = document.getElementById('grid');
        let grid = [];

        // Initialize grid
        function initGrid() {
            for (let i = 0; i < rows; i++) {
                let row = [];
                for (let j = 0; j < cols; j++) {
                    let cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    cell.addEventListener('click', () => toggleWall(cell));
                    gridElement.appendChild(cell);
                    row.push(cell);
                }
                grid.push(row);
            }
        }

        function toggleWall(cell) {
            cell.classList.toggle('wall');
        }

        function findPath() {
            let walls = [];
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (grid[i][j].classList.contains('wall')) {
                        walls.push({x: i, y: j});
                    }
                }
            }

            fetch('pathfinding.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({walls: walls})
            })
            .then(response => response.json())
            .then(data => {
                if (data.path) {
                    for (let node of data.path) {
                        if (!(node.x === 0 && node.y === 0) && !(node.x === 9 && node.y === 9)) {
                            grid[node.x][node.y].classList.add('path');
                        }
                    }
                } else {
                    alert('No path found');
                }
            });
        }

        // Initialize the grid on page load
        window.onload = initGrid;
    </script>
</body>
</html>
