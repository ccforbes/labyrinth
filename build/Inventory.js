"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inventory {
    constructor() {
        this.items = new Set();
        this.itemNames = new Map();
    }
    // check if item exists in the Inventory
    hasItem(itemName) {
        const item = this.itemNames.get(itemName);
        if (!item) {
            return false;
        }
        return true;
    }
    // add item into the inventory
    addItem(newItem) {
        this.items.add(newItem);
        this.itemNames.set(newItem.getName(), newItem);
    }
    // get the item from the inventory
    getItem(itemName) {
        return this.itemNames.get(itemName);
    }
    // getters
    getItems() { return this.items; }
    ;
    getItemNames() { return this.itemNames; }
    ;
}
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map