"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, description, isAWeapon, isAKey, isTheTreasure) {
        this.name = name;
        this.description = description;
        this.isAWeapon = isAWeapon;
        this.isAKey = isAKey;
        this.isTheTreasure = isTheTreasure;
    }
    // getters
    getName() { return this.name; }
    ;
    getDescription() { return this.description; }
    ;
    isKey() { return this.isAKey; }
    ;
    isTreasure() { return this.isTheTreasure; }
    ;
    isWeapon() { return this.isAWeapon; }
    ;
}
exports.default = Item;
//# sourceMappingURL=Item.js.map