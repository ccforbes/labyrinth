import Area from './Area';
import Item from './Item';
import Inventory from './Inventory';

export default class Player {
    private currLocation: Area;
    private inventory: Inventory;
    private alive: boolean;
    private prevLocation: Area;

    constructor(startLocation: Area) {
        this.currLocation = startLocation;
        this.inventory = new Inventory();
        this.alive = true;
        this.prevLocation = startLocation;
    }

    // update a player's location
    public updateLocation(newLocation: Area): void {
        this.prevLocation = this.currLocation;
        this.currLocation = newLocation;
    }

    // update the player's inventory
    public updateInventory(newItem: Item) : void {
        this.inventory.addItem(newItem);
    }

    // check player's inventory for item
    public hasItem(itemName: string) : boolean {
        return this.inventory.hasItem(itemName);
    }

    // player is now dead
    public killPlayer(): void {
        this.alive = false;
    }

    // getters
    public getCurrLocation(): Area { return this.currLocation };
    public isAlive(): boolean { return this.alive };
    public getInventory(): Inventory { return this.inventory };
    public getPrevLocation(): Area { return this.prevLocation };
}