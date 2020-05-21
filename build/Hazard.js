"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hazard {
    constructor(name, description, key) {
        this.name = name;
        this.description = description;
        this.key = key;
    }
    // getters
    getName() { return this.name; }
    ;
    getDescription() { return this.description; }
    ;
    getHazardKey() { return this.key; }
    ;
}
exports.default = Hazard;
//# sourceMappingURL=Hazard.js.map