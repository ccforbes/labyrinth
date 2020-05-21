"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Player_1 = __importDefault(require("./Player"));
const Labyrinth_1 = __importDefault(require("./Labyrinth"));
const Game_1 = __importDefault(require("./Game"));
const JSONLoader_1 = __importDefault(require("./JSONLoader"));
const data = require('./game.json');
// initialize game objects
const loader = new JSONLoader_1.default(data);
const startText = loader.getStartText();
const endText = loader.getEndText();
const areas = loader.getAreas();
const startArea = loader.getStartArea();
const endArea = loader.getEndArea();
const monster = loader.getMonster();
const treasure = loader.getTreasure();
const player = new Player_1.default(startArea);
const labyrinth = new Labyrinth_1.default(areas, startArea, endArea);
const game = new Game_1.default(startText, endText, labyrinth, player, monster, treasure);
// handleInput takes in a command and an argument. Returns true
// if the game should continue andthe user should be prompted again, 
// and returns false if the game should stop.
function handleInput(cmd, arg) {
    const modArg = arg.toUpperCase();
    switch (cmd) {
        case Parser_1.Command.GO:
            game.handlePlayerGo(modArg);
            break;
        case Parser_1.Command.TAKE:
            game.handlePlayerTake(modArg);
            break;
        case Parser_1.Command.INVENTORY:
            game.printInventory();
            break;
        case Parser_1.Command.LOOK:
            game.printScenario();
            break;
        case Parser_1.Command.USE:
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
    if (cmd == Parser_1.Command.GO || cmd == Parser_1.Command.TAKE || cmd == Parser_1.Command.USE) {
        game.printScenario();
    }
    console.log('What would you like to do? ');
    return true; // return true to indicate that it should prompt for another input
}
// Starts the game. Set up the parser and print the beginning text
function startGame() {
    const parser = new Parser_1.CommandParser(handleInput);
    game.printStartGameText();
    game.printScenario();
    parser.start();
}
startGame();
//# sourceMappingURL=app.js.map