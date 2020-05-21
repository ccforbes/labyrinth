"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Labyrinth {
    constructor(areaList, start, end) {
        this.areaMap = [];
        this.start = start;
        this.end = end;
        for (const area of areaList) {
            const x = area.getCoordinates()[0];
            const y = area.getCoordinates()[1];
            if (!this.areaMap[x]) {
                this.areaMap[x] = [];
            }
            this.areaMap[x][y] = area;
        }
    }
    // gets a new location from the Labyrinth, returns undefined if none exists in 
    // the labyrinth
    getNewLocation(direction, currLocationCoord) {
        const x = direction[0];
        const y = direction[1];
        const currX = currLocationCoord[0];
        const currY = currLocationCoord[1];
        if (!this.validateCoordinates(currX + x, currY + y)) {
            return undefined;
        }
        return this.areaMap[currX + x][currY + y];
    }
    // removes item from a given location 
    removeItemFromLocation(area) {
        const coordinates = area.getCoordinates();
        const x = coordinates[0];
        const y = coordinates[1];
        this.areaMap[x][y].removeItem();
        if (this.areaMap[x][y].getName() === this.start.getName()) {
            this.start.removeItem();
        }
        if (this.areaMap[x][y].getName() === this.end.getName()) {
            this.end.removeItem();
        }
    }
    // removes hazard from a given location
    removeHazardFromLocation(area) {
        const coordinates = area.getCoordinates();
        const x = coordinates[0];
        const y = coordinates[1];
        this.areaMap[x][y].removeHazard();
        if (this.areaMap[x][y].getName() === this.start.getName()) {
            this.start.removeHazard();
        }
        if (this.areaMap[x][y].getName() === this.end.getName()) {
            this.end.removeHazard();
        }
    }
    // helper method to validate the coordinates to accurately access the Labyrinth
    validateCoordinates(x, y) {
        const columnLength = this.areaMap.length;
        let rowLength = 0;
        for (const row of this.areaMap) {
            if (row.length > rowLength) {
                rowLength = row.length;
            }
        }
        return x >= 0 && x < columnLength && y >= 0 && y < rowLength;
    }
    // getters
    getStartArea() { return this.start; }
    ;
    getEndArea() { return this.end; }
    ;
}
exports.default = Labyrinth;
//# sourceMappingURL=Labyrinth.js.map