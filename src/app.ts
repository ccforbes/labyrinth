import {Command, CommandParser} from './Parser';
import Area from './Area';
import Item from './Item';
import Monster from './Monster';
import Player from './Player';
import Labyrinth  from './Labyrinth';
import Game from './Game';
import JSONLoader from './JSONLoader';
const data: any = require('./game.json');

// initialize game objects
const loader: JSONLoader = new JSONLoader(data);
const startText: string = loader.getStartText();
const endText: string = loader.getEndText();
const areas: Area[] = loader.getAreas();
const startArea: Area = loader.getStartArea();
const endArea: Area = loader.getEndArea();
const monster: Monster = loader.getMonster();
const treasure: Item = loader.getTreasure();
const player: Player = new Player(startArea);
const labyrinth: Labyrinth = new Labyrinth(areas, startArea, endArea);
const game: Game = new Game(startText, endText, labyrinth, player, monster, treasure);


// handleInput takes in a command and an argument. Returns true
// if the game should continue andthe user should be prompted again, 
// and returns false if the game should stop.
function handleInput(cmd: Command, arg: string): boolean {
    const modArg: string = arg.toUpperCase();
    switch (cmd) {
        case Command.GO:
            game.handlePlayerGo(modArg);     
            break;

        case Command.TAKE:
            game.handlePlayerTake(modArg);
            break;

        case Command.INVENTORY:
            game.printInventory();      
            break;

        case Command.LOOK:  
            game.printScenario();    
            break;

        case Command.USE:
            game.handlePlayerUse(modArg);
            break;    
    }

    if (!game.isPlayerAlive()) {
        return false;
    }

    if (game.playerAtLocationWithTreasure()) {
        game.printEndGameText();
        return false;
    }
    
    if (game.isMonsterAlive()) {
        game.moveMonster();
    }
    
    if (cmd == Command.GO || cmd == Command.TAKE || cmd == Command.USE) {
        game.printScenario();
    }

    console.log('What would you like to do? ');
    return true; // return true to indicate that it should prompt for another input
}

// Starts the game. Set up the parser and print the beginning text
function startGame(): void {
    const parser = new CommandParser(handleInput);
    game.printStartGameText();
    game.printScenario();
    parser.start();
}

startGame();

