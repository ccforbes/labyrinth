"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = __importDefault(require("./Monster"));
const Area_1 = __importDefault(require("./Area"));
const Item_1 = __importDefault(require("./Item"));
const Hazard_1 = __importDefault(require("./Hazard"));
const AreaAssets_1 = __importDefault(require("./AreaAssets"));
class JSONLoader {
    constructor(data) {
        this.data = data;
        this.startText = this.data.startText;
        this.endText = this.data.endText;
        this.areas = this.parseAreasAndPotentialAssets();
        this.startArea = this.parseArea(this.data.startArea);
        this.endArea = this.parseArea(this.data.endArea);
        this.monster = this.parseMonster();
        this.treasure = this.parseItem(this.data.treasure);
    }
    // getters
    getStartText() { return this.startText; }
    ;
    getEndText() { return this.endText; }
    ;
    getAreas() { return this.areas; }
    ;
    getMonster() { return this.monster; }
    ;
    getStartArea() { return this.startArea; }
    ;
    getEndArea() { return this.endArea; }
    ;
    getTreasure() { return this.treasure; }
    ;
    // helper method that parses a list of areas with its potential areas
    parseAreasAndPotentialAssets() {
        const areaList = this.data.areas;
        let tempAreas = [];
        for (const area of areaList) {
            tempAreas.push(this.parseArea(area));
        }
        return tempAreas;
    }
    // helper method that parses an area from a JSON
    parseArea(area) {
        const name = area.name;
        const description = area.description;
        const coordinates = area.coordinates;
        let item = undefined;
        let hazard = undefined;
        if (area.item !== undefined) {
            item = this.parseItem(area.item);
        }
        if (area.hazard !== undefined) {
            hazard = this.parseHazard(area.hazard);
        }
        const areaAssets = new AreaAssets_1.default(item, hazard);
        return new Area_1.default(name, description, coordinates, areaAssets);
    }
    // helper method to parse an item from a JSON
    parseItem(item) {
        const name = item.name;
        const description = item.description;
        let isKey = false;
        let isTreasure = false;
        let isWeapon = false;
        if (item.key) {
            isKey = true;
        }
        if (item.treasure) {
            isTreasure = true;
        }
        if (item.weapon) {
            isWeapon = true;
        }
        return new Item_1.default(name, description, isWeapon, isKey, isTreasure);
    }
    // helper method to parse a hazard from a JSON
    parseHazard(hazard) {
        const name = hazard.name;
        const description = hazard.description;
        const key = this.parseItem(hazard.key);
        return new Hazard_1.default(name, description, key);
    }
    // helper method to parse the monster from a JSON
    parseMonster() {
        const name = this.data.monster.name;
        const startLocation = this.parseArea(this.data.monster.startLocation);
        return new Monster_1.default(name, startLocation);
    }
}
exports.default = JSONLoader;
//# sourceMappingURL=JSONLoader.js.map