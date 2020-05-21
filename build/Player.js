"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Inventory_1 = __importDefault(require("./Inventory"));
class Player {
    constructor(startLocation) {
        this.currLocation = startLocation;
        this.inventory = new Inventory_1.default();
        this.alive = true;
        this.prevLocation = startLocation;
    }
    // update a player's location
    updateLocation(newLocation) {
        this.prevLocation = this.currLocation;
        this.currLocation = newLocation;
    }
    // update the player's inventory
    updateInventory(newItem) {
        this.inventory.addItem(newItem);
    }
    // check player's inventory for item
    hasItem(itemName) {
        return this.inventory.hasItem(itemName);
    }
    // player is now dead
    killPlayer() {
        this.alive = false;
    }
    // getters
    getCurrLocation() { return this.currLocation; }
    ;
    isAlive() { return this.alive; }
    ;
    getInventory() { return this.inventory; }
    ;
    getPrevLocation() { return this.prevLocation; }
    ;
}
exports.default = Player;
//# sourceMappingURL=Player.js.map