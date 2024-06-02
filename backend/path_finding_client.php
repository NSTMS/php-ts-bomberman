<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PathFinding</title>
</head>
<body>
    <table id="grid" style="border-collapse: collapse;"></table>
    <script>
       let clicks = 0;
        const rows = 5;
        const cols = 5;

        const grid = document.getElementById('grid');
        let cells = [];
        let walls = [];

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('td');
                cell.style.width = '50px';
                cell.style.height = '50px';
                cell.style.border = '1px solid black';
                cell.style.textAlign = 'center';
                cell.style.verticalAlign = 'middle';
                cell.addEventListener('click', () => cellOnClick(cell));
                cells.push({cell: cell, x: i, y: j})
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }

        const cellOnClick = (cell) =>{
            if (cell.style.backgroundColor === 'black') {
                return;
            }
            clicks++;
            if(clicks === 1){
                cell.innerHTML = 'S';
            } else if(clicks === 2){
                cell.innerHTML = 'E';
                const start = cells.find(c => c.cell.innerHTML === 'S');
                const end = cells.find(c => c.cell.innerHTML === 'E');

                const data = {
                    start: {x: start.x, y: start.y},
                    end: {x: end.x, y: end.y},
                    walls: walls
                };

                fetch('pathfinding.php', {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(path => {
                    path.forEach(p => {
                        cells.find(c => c.x === p.x && c.y === p.y).cell.style.backgroundColor = 'green';
                    });
                });
            }
            else {
                reset();
                clicks = 0;
            }
        }
        
        const getRandomWalls = () => {
            walls = [];
            const counter = 5;
            for (let i = 0; i < counter; i++) {
                const x = Math.floor(Math.random() * rows);
                const y = Math.floor(Math.random() * cols);
                walls.push({x: x, y: y});
                cells.find(c => c.x === x && c.y === y).cell.style.backgroundColor = 'black';
            }
            return walls;
        }

        const reset = () =>{
            cells.forEach(c => {
                c.cell.innerHTML = '';
                c.cell.style.backgroundColor = '';
            });
            getRandomWalls();
        }
        getRandomWalls();
    </script>
</body>
</html>
