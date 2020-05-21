import Area from "./Area";

export default class Monster {
    private name: string;
    private location: Area;
    private alive: boolean;

    constructor(name: string, startLocation: Area) {
        this.name = name;
        this.location = startLocation;
        this.alive = true;
    }

    // monster is now dead, not alive
    public killMonster(): void {
        this.alive = false;
    }

    // update the monster's location
    public updateLocation(newLocation: Area): void {
        this.location = newLocation;
    }

    // getters
    public getName(): string { return this.name };
    public getLocation(): Area { return this.location };
    public isAlive(): boolean { return this.alive };
}