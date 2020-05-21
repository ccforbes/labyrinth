import Area from './Area';
import Hazard from './Hazard';
import Item from './Item';
import Monster from './Monster';
import Player from './Player';
import Labyrinth  from './Labyrinth';
import Inventory from './Inventory';

export default class Game {
    private directions: Map<string, number[]> = new Map([
        ["NORTH", [-1, 0]],
        ["SOUTH", [1, 0]],
        ["EAST", [0, 1]],
        ["WEST", [0, -1]]
    ]);

    constructor(
        private startText: string,
        private endText: string,
        private labyrinth: Labyrinth, 
        private player: Player, 
        private monster: Monster,
        private treasure: Item
    ) {}

    // handles the logic for if player chooses GO
    public handlePlayerGo(direction: string): void {
        if (this.monsterPlayerSameLocation()) {
            this.player.killPlayer();
            console.log(`You tried to escape but the ${this.monster.getName()} killed you!`);
            return;
        }
        
        const currLocation: Area = this.player.getCurrLocation();
        const currLocationCoord: number[] = currLocation.getCoordinates();

        const testDirection = this.directions.get(direction);
        if (!testDirection) {
            console.log("That's not a valid direction!")
            return;
        }
        
        const newLocation = this.labyrinth.getNewLocation(testDirection, currLocationCoord);
        if (!newLocation) {
            console.log("That's not a valid direction!")
            return;
        }

        const previousLocation = this.player.getPrevLocation();
        const hazard: Hazard | undefined = currLocation.getHazard()
        if (hazard && newLocation.getName() !== previousLocation.getName()) {
            console.log("You can't go because of the", hazard.getName());
            return;
        }
            
        this.player.updateLocation(newLocation);
    }

    // handles logic for when player chooses TAKE
    public handlePlayerTake(itemName: string): void {
        if (this.monsterPlayerSameLocation()) {
            this.player.killPlayer();
            console.log(`You tried to take the item but the ${this.monster.getName()} killed you!`);
            return;
        }

        const currLocation: Area = this.player.getCurrLocation();
        const itemAtLocation: Item | undefined = currLocation.getItem();
        const hazardAtLocation: Hazard | undefined = currLocation.getHazard()

        if (hazardAtLocation) {
            console.log("You can't access anything because of the", hazardAtLocation.getName())
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
    public handlePlayerUse(itemName: string): void {
        const currLocation: Area = this.player.getCurrLocation();
        const hazard: Hazard | undefined = currLocation.getHazard();

        if (this.monsterPlayerSameLocation()) {
            this.monsterEncounter(itemName);
            return;
        }

        if (!this.player.hasItem(itemName)) {
            console.log("You don't have that item.")
            return;
        }

        if (hazard) {
            const hazardKey: Item = hazard.getHazardKey();
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
    public isPlayerAlive(): boolean {
        return this.player.isAlive();
    }

    // checks if player is dead
    public isMonsterAlive(): boolean {
        return this.monster.isAlive();
    }

    // checks to see if the monster is in the same location as player
    public monsterPlayerSameLocation(): boolean {
        return this.player.getCurrLocation() === this.monster.getLocation() && this.isMonsterAlive();
    }

    // helper method that moves the monster
    public moveMonster(): void {
        const currLocation: Area = this.monster.getLocation();
        const currLocationCoord: number[] = currLocation.getCoordinates();
        
        let newLocation: Area | undefined = undefined;
        let keys: string[]; 
        let direction: string;
        let testDirection: number[] | undefined; 

        while (!newLocation) {
            keys= Array.from(this.directions.keys());
            direction= keys[Math.floor(Math.random() * keys.length)];
    
            testDirection = this.directions.get(direction);
            if (!testDirection) {
                return;
            }
    
            newLocation= this.labyrinth.getNewLocation(testDirection, currLocationCoord);
        }
        this.monster.updateLocation(newLocation);
    }

    // checks to see if the player is at the exit with the treasure
    public playerAtLocationWithTreasure(): boolean {
        const currLocation: Area = this.player.getCurrLocation();
        const endArea: Area = this.labyrinth.getEndArea();
        const atExit: boolean = currLocation.getName() === endArea.getName() &&
            !currLocation.getHazard();
        const hasTreasure: boolean = this.player.hasItem(this.treasure.getName());
        return atExit && hasTreasure;
    }

    public printEndGameText(): void {
        console.log(this.endText);
    }

    // prints the player's inventory with the item's name and description
    public printInventory() : void { 
        const inventory: Inventory = this.player.getInventory();
        console.log("=========");
        console.log("INVENTORY");
        console.log("=========");
        inventory.getItems().forEach(item => {
            console.log(item.getName() + ": " + item.getDescription());
        });
        console.log("=========");
    }

    // print the game's current scenario
    public printScenario() : void {
        const currLocation: Area = this.player.getCurrLocation();
        const hazard : Hazard | undefined = currLocation.getHazard();
        const item : Item | undefined = currLocation.getItem();

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

    public printStartGameText(): void {
        console.log(this.startText);
    }

    // helper method that deals with the encounter with the monster
    private monsterEncounter(itemName: string): void {
        const inventory: Inventory = this.player.getInventory();
        const item: Item | undefined = inventory.getItem(itemName);
        if (!this.player.hasItem(itemName) || !item) {
            console.log("You don't have that item.");
            return;
        }
        if (item.isWeapon()) {
            this.monster.killMonster();
            console.log(`You killed the ${this.monster.getName()} with the ${item.getName()}!`);
        } else {
            this.player.killPlayer();
            console.log(`You use the ${item.getName()} but it has no affect! The ${this.monster.getName()} killed you!`);
        }
    }
}