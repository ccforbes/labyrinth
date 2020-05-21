"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    constructor(startText, endText, labyrinth, player, monster, treasure) {
        this.startText = startText;
        this.endText = endText;
        this.labyrinth = labyrinth;
        this.player = player;
        this.monster = monster;
        this.treasure = treasure;
        this.directions = new Map([
            ["NORTH", [-1, 0]],
            ["SOUTH", [1, 0]],
            ["EAST", [0, 1]],
            ["WEST", [0, -1]]
        ]);
    }
    // handles the logic for if player chooses GO
    handlePlayerGo(direction) {
        if (this.monsterPlayerSameLocation()) {
            this.player.killPlayer();
            console.log(`You tried to escape but the ${this.monster.getName()} killed you!`);
            return;
        }
        const currLocation = this.player.getCurrLocation();
        const currLocationCoord = currLocation.getCoordinates();
        const testDirection = this.directions.get(direction);
        if (!testDirection) {
            console.log("That's not a valid direction!");
            return;
        }
        const newLocation = this.labyrinth.getNewLocation(testDirection, currLocationCoord);
        if (!newLocation) {
            console.log("That's not a valid direction!");
            return;
        }
        const previousLocation = this.player.getPrevLocation();
        const hazard = currLocation.getHazard();
        if (hazard && newLocation.getName() !== previousLocation.getName()) {
            console.log("You can't go because of the", hazard.getName());
            return;
        }
        this.player.updateLocation(newLocation);
    }
    // handles logic for when player chooses TAKE
    handlePlayerTake(itemName) {
        if (this.monsterPlayerSameLocation()) {
            this.player.killPlayer();
            console.log(`You tried to take the item but the ${this.monster.getName()} killed you!`);
            return;
        }
        const currLocation = this.player.getCurrLocation();
        const itemAtLocation = currLocation.getItem();
        const hazardAtLocation = currLocation.getHazard();
        if (hazardAtLocation) {
            console.log("You can't access anything because of the", hazardAtLocation.getName());
            return;
        }
        if (!itemAtLocation) {
            console.log("There is no item to take in the", currLocation.getName());
            return;
        }
        if (itemName !== itemAtLocation.getName()) {
            console.log("The item doesn't exist here in", currLocation.getName());
            return;
        }
        this.player.updateInventory(itemAtLocation);
        this.labyrinth.removeItemFromLocation(currLocation);
    }
    // handle's logic for when player chooses USE
    handlePlayerUse(itemName) {
        const currLocation = this.player.getCurrLocation();
        const hazard = currLocation.getHazard();
        if (this.monsterPlayerSameLocation()) {
            this.monsterEncounter(itemName);
            return;
        }
        if (!this.player.hasItem(itemName)) {
            console.log("You don't have that item.");
            return;
        }
        if (hazard) {
            const hazardKey = hazard.getHazardKey();
            if (hazardKey.getName() != itemName) {
                console.log("You can't use that here.");
                return;
            }
            this.labyrinth.removeHazardFromLocation(currLocation);
            return;
        }
        console.log("You can't use that here.");
    }
    // checks if player is alive
    isPlayerAlive() {
        return this.player.isAlive();
    }
    // checks if player is dead
    isMonsterAlive() {
        return this.monster.isAlive();
    }
    // checks to see if the monster is in the same location as player
    monsterPlayerSameLocation() {
        return this.player.getCurrLocation() === this.monster.getLocation() && this.isMonsterAlive();
    }
    // helper method that moves the monster
    moveMonster() {
        const currLocation = this.monster.getLocation();
        const currLocationCoord = currLocation.getCoordinates();
        let newLocation = undefined;
        let keys;
        let direction;
        let testDirection;
        while (!newLocation) {
            keys = Array.from(this.directions.keys());
            direction = keys[Math.floor(Math.random() * keys.length)];
            testDirection = this.directions.get(direction);
            if (!testDirection) {
                return;
            }
            newLocation = this.labyrinth.getNewLocation(testDirection, currLocationCoord);
        }
        this.monster.updateLocation(newLocation);
    }
    // checks to see if the player is at the exit with the treasure
    playerAtLocationWithTreasure() {
        const currLocation = this.player.getCurrLocation();
        const endArea = this.labyrinth.getEndArea();
        const atExit = currLocation.getName() === endArea.getName() &&
            !currLocation.getHazard();
        const hasTreasure = this.player.hasItem(this.treasure.getName());
        return atExit && hasTreasure;
    }
    printEndGameText() {
        console.log(this.endText);
    }
    // prints the player's inventory with the item's name and description
    printInventory() {
        const inventory = this.player.getInventory();
        console.log("=========");
        console.log("INVENTORY");
        console.log("=========");
        inventory.getItems().forEach(item => {
            console.log(item.getName() + ": " + item.getDescription());
        });
        console.log("=========");
    }
    // print the game's current scenario
    printScenario() {
        const currLocation = this.player.getCurrLocation();
        const hazard = currLocation.getHazard();
        const item = currLocation.getItem();
        console.log("---------");
        console.log(currLocation.getName());
        if (this.monsterPlayerSameLocation()) {
            console.log(`There is a ${this.monster.getName()} in the area`);
        }
        else if (hazard) {
            console.log(hazard.getDescription());
        }
        else {
            console.log(currLocation.getDescription());
            if (item) {
                console.log(`There is a ${item.getName()} in the ${currLocation.getName()}. ${item.getDescription()}`);
            }
        }
        console.log("---------");
    }
    printStartGameText() {
        console.log(this.startText);
    }
    // helper method that deals with the encounter with the monster
    monsterEncounter(itemName) {
        const inventory = this.player.getInventory();
        const item = inventory.getItem(itemName);
        if (!this.player.hasItem(itemName) || !item) {
            console.log("You don't have that item.");
            return;
        }
        if (item.isWeapon()) {
            this.monster.killMonster();
            console.log(`You killed the ${this.monster.getName()} with the ${item.getName()}!`);
        }
        else {
            this.player.killPlayer();
            console.log(`You use the ${item.getName()} but it has no affect! The ${this.monster.getName()} killed you!`);
        }
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map