<?php
class Playfield {
    public $walls = array();
    public $destructableWalls = array();
    public $players = array();
    public $baloons = array();
    public $width = 31;
    public $height = 13;

    public function __construct() {
        $this->walls = $this->createWalls();
        $this->destructableWalls = $this->createDestructableWalls();
        $this->players = array();
        $this->baloons = $this->createBaloons();
    }

    public function createWalls() {
        $walls = array();
        for ($x = 0; $x < $this->width; $x++) {
            for ($y = 0; $y < $this->height; $y++) {
                if ($x === 0 || $y === 0 || $x === $this->width - 1 || $y === $this->height - 1 || ($x % 2 === 0 && $y % 2 === 0)) {
                    $walls[] = array("x" => $x, "y" => $y);
                }
            }
        }
        return $walls;
    }

    public function createDestructableWalls() {
        $destructableWalls = array();
        $counter = 40;
        for ($i = 0; $i < $counter; $i++) {
            $position = $this->getRandomFreePosition();
            $destructableWalls[] = $position;
        }
        return $destructableWalls;
    }

    public function updateBaloonsPositions() {
        foreach ($this->baloons as &$baloon) {
            $newPosition = [
                'x' => $baloon['position']['x'] + $baloon['direction']['x'],
                'y' => $baloon['position']['y'] + $baloon['direction']['y']
            ];
    
            if (!$this->checkCollision($newPosition)) {
                $baloon['position'] = $newPosition;
            } else {
                $baloon['direction'] = [
                    'x' => -$baloon['direction']['x'],
                    'y' => -$baloon['direction']['y']
                ];
            }
        }
    }
    
    private function checkCollision($position) {
        foreach ($this->walls as $wall) {
            if ($wall['x'] === $position['x'] && $wall['y'] === $position['y']) {
                return true; 
            }
        }
        foreach ($this->destructableWalls as $destructableWall) {
            if ($destructableWall['x'] === $position['x'] && $destructableWall['y'] === $position['y']) {
                return true;
            }
        }
        return false; 
    }
    

    public function getRandomPosition() {
        return array('x' => rand(1, $this->width - 1), 'y' => rand(1, $this->height - 1));
    }

    public function getRandomFreePosition() {
        $position = $this->getRandomPosition();
        $obstacles = array_merge($this->walls, $this->destructableWalls);

        foreach ($obstacles as $wall) {
            if ($wall["x"] === $position['x'] && $wall["y"] === $position['y']) {
                return $this->getRandomFreePosition();
            }
        }
        if ($position['x'] % 2 == 0 && $position['y'] % 2 == 0) return $this->getRandomFreePosition();
        return $position;
    }

    public function createBaloons() {
        $baloons = array();
        $counter = 8;
        for ($i = 0; $i < $counter; $i++) {
            $position = $this->getRandomFreePosition();
            $direction = $this->getDirection($position);
            $baloons[] = array('position' => $position, 'direction' => $direction);
        }
        return $baloons;
    }

    public function getDirection($position) {
        $freeSpaceX = $this->getFreeSpaceInAxis($position, 'x');
        $freeSpaceY = $this->getFreeSpaceInAxis($position, 'y');

        if ($freeSpaceX > 0 && $freeSpaceY > 0) {
            return $freeSpaceX > $freeSpaceY ? array('x' => rand(0, 1) * 2 - 1, 'y' => 0) : array('x' => 0, 'y' => rand(0, 1) * 2 - 1);
        } elseif ($freeSpaceX > 0) {
            return array('x' => rand(0, 1) * 2 - 1, 'y' => 0);
        } elseif ($freeSpaceY > 0) {
            return array('x' => 0, 'y' => rand(0, 1) * 2 - 1);
        } 
        return array('x' => 1, 'y' => 0);
    }

    public function getFreeSpaceInAxis($position, $axis) {
        $space = 0;
        $dir = array('x' => 0, 'y' => 0);

        $dir[$axis] = 1;
        while ($this->isFreePosition($position, $dir)) {
            $space++;
            $position[$axis]++;
        }

        $position[$axis] -= $space;

        $dir[$axis] = -1;
        while ($this->isFreePosition($position, $dir)) {
            $space++;
            $position[$axis]--;
        }

        return $space;
    }

    public function isFreePosition($position, $dir) {
        $newPosition = array('x' => $position['x'] + $dir['x'], 'y' => $position['y'] + $dir['y']);

        if ($newPosition['x'] <= 0 || $newPosition['x'] >= $this->width - 1 || $newPosition['y'] <= 0 || $newPosition['y'] >= $this->height - 1) {
            return false;
        }

        foreach (array_merge($this->walls, $this->destructableWalls) as $wall) {
            if ($wall['x'] === $newPosition['x'] && $wall['y'] === $newPosition['y']) {
                return false;
            }
        }
        return true;
    }
}
