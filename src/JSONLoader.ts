import Monster from "./Monster";
import Area from "./Area";
import Item from "./Item";
import Hazard from "./Hazard";
import AreaAssets from "./AreaAssets";

export default class JSONLoader {
    private startText: string;
    private endText: string;
    private areas: Area[];
    private startArea: Area;
    private endArea: Area;
    private monster: Monster;
    private treasure: Item;

    constructor(private data: any) {
        this.startText = this.data.startText;
        this.endText = this.data.endText;
        this.areas = this.parseAreasAndPotentialAssets();
        this.startArea = this.parseArea(this.data.startArea);
        this.endArea = this.parseArea(this.data.endArea);
        this.monster = this.parseMonster();
        this.treasure = this.parseItem(this.data.treasure);
    }

    // getters
    public getStartText(): string { return this.startText };
    public getEndText(): string { return this.endText };
    public getAreas(): Area[] { return this.areas };
    public getMonster(): Monster { return this.monster };
    public getStartArea(): Area { return this.startArea };
    public getEndArea(): Area { return this.endArea };
    public getTreasure(): Item { return this.treasure };

    // helper method that parses a list of areas with its potential areas
    private parseAreasAndPotentialAssets(): Area[] {
        const areaList = this.data.areas
        let tempAreas: Area[] = [];
        for (const area of areaList) {
            tempAreas.push(this.parseArea(area));
        }
        return tempAreas;
    }

    // helper method that parses an area from a JSON
    private parseArea(area: any): Area {
        const name: string = area.name;
        const description: string = area.description;
        const coordinates: number[] = area.coordinates;
        let item: Item | undefined = undefined;
        let hazard: Hazard | undefined = undefined;
        if (area.item !== undefined) {
            item = this.parseItem(area.item);
        }
        if (area.hazard !== undefined) {
            hazard = this.parseHazard(area.hazard);
        }
        const areaAssets: AreaAssets = new AreaAssets(item, hazard);

        return new Area(name, description, coordinates, areaAssets);
    }

    // helper method to parse an item from a JSON
    private parseItem(item: any): Item {
        const name: string = item.name;
        const description: string = item.description;
        let isKey: boolean = false;
        let isTreasure: boolean = false;
        let isWeapon: boolean = false;
        if (item.key) {
            isKey = true;
        }
        if (item.treasure) {
            isTreasure = true;
        }
        if (item.weapon) {
            isWeapon = true;
        }

        return new Item(name, description, isWeapon, isKey, isTreasure);
    }

    // helper method to parse a hazard from a JSON
    private parseHazard(hazard: any): Hazard {
        const name: string = hazard.name;
        const description: string = hazard.description;
        const key: Item = this.parseItem(hazard.key);

        return new Hazard(name, description, key);
    }

    // helper method to parse the monster from a JSON
    private parseMonster(): Monster {
        const name: string = this.data.monster.name;
        const startLocation: Area = 
            this.parseArea(this.data.monster.startLocation);

        return new Monster(name, startLocation);
    }
}