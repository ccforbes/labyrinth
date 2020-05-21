"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Monster {
    constructor(name, startLocation) {
        this.name = name;
        this.location = startLocation;
        this.alive = true;
    }
    // monster is now dead, not alive
    killMonster() {
        this.alive = false;
    }
    // update the monster's location
    updateLocation(newLocation) {
        this.location = newLocation;
    }
    // getters
    getName() { return this.name; }
    ;
    getLocation() { return this.location; }
    ;
    isAlive() { return this.alive; }
    ;
}
exports.default = Monster;
//# sourceMappingURL=Monster.js.map