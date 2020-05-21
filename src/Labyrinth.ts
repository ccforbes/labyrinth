import Area from "./Area";

export default class Labyrinth {
    private areaMap: Area[][]; 
    private start: Area; 
    private end: Area;
    
    constructor(areaList: Area[], start: Area, end: Area) {
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
    public getNewLocation(direction: number[], currLocationCoord: number[]): Area | undefined {
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
    public removeItemFromLocation(area: Area): void {
        const coordinates: number[] = area.getCoordinates();
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
    public removeHazardFromLocation(area: Area): void {
        const coordinates: number[] = area.getCoordinates();
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
    private validateCoordinates(x: number, y: number): boolean {
        const columnLength: number = this.areaMap.length;
        let rowLength: number = 0;
        for (const row of this.areaMap) {
            if (row.length > rowLength) {
                rowLength = row.length;
            }
        }
        return x >= 0 && x < columnLength && y >= 0 && y < rowLength;
    }

    // getters
    public getStartArea(): Area { return this.start };
    public getEndArea(): Area { return this.end };
    
}