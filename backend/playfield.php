<?php

class Playfield{
    public $walls = array();
    public $destructableWalls = array();
    public $players = array();
    public $baloons = array();
    public $width = 31;
    public $height = 13;

    public function __construct(){
        $this->walls = $this->createWalls();
        $this->destructableWalls = $this->createDestructableWalls();
        $this->players = array(); // Assuming this is initialized elsewhere
        $this->baloons = $this->createBaloons();
    }

    public function createWalls(){
        $walls = array();
        for($x = 0; $x < $this->width; $x++){
            for($y = 0; $y < $this->height; $y++){
                if ($x === 0 || $y === 0 || $x === $this->width - 1 || $y === $this->height - 1 || ($x % 2 === 0 && $y % 2 === 0)) {
                    $walls[] = array("x"=> $x,"y"=> $y);
                }
            }
        }
        return $walls;
    }

    public function createDestructableWalls(){
        $destructableWalls = array();
        $counter = 20;
        for($i = 0; $i < $counter; $i++){
            $position = $this->getRandomFreePosition();
            $destructableWalls[] = $position;
        }
        return $destructableWalls;
    }

    public function getRandomPosition(){
        return array('x' => rand(1, $this->width - 1), 'y' => rand(1, $this->height - 1));
    }

    public function getRandomFreePosition(){
        $position = $this->getRandomPosition();

        foreach ($this->walls as $wall) {
            if (($wall["x"] === $position['x'] && $wall["y"] === $position['y']) || ($position['x'] == 1 && $position['y'] == 1)) {
                $position = $this->getRandomFreePosition();
            }
        }
        return $position;
    }

    public function createBaloons(){
        $baloons = array();
        $baloons[] = array('x' => 1, 'y' => 1);
        $baloons[] = array('x' => 1, 'y' => 3);
        $baloons[] = array('x' => 1, 'y' => 5);
        return $baloons;
    }
}
