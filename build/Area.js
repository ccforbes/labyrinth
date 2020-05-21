"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(name, description, coordinates, areaAssets) {
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.item = areaAssets.getItem();
        this.hazard = areaAssets.getHazard();
    }
    removeItem() {
        this.item = undefined;
    }
    removeHazard() {
        this.hazard = undefined;
    }
    getName() { return this.name; }
    ;
    getDescription() { return this.description; }
    ;
    getCoordinates() { return this.coordinates; }
    ;
    getItem() { return this.item; }
    ;
    getHazard() { return this.hazard; }
    ;
}
exports.default = Area;
//# sourceMappingURL=Area.js.map