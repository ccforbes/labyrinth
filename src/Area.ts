import Item from "./Item";
import Hazard from "./Hazard";
import AreaAssets from "./AreaAssets";

export default class Area {
    private name: string;
    private description: string;
    private coordinates: number[];
    private item?: Item;
    private hazard?: Hazard;

    constructor (
        name: string,
        description: string,
        coordinates: number[],
        areaAssets: AreaAssets
    ) {
        this.name = name;
        this.description = description;
        this.coordinates = coordinates;
        this.item = areaAssets.getItem();
        this.hazard = areaAssets.getHazard();
    }

      
    public removeItem() : void {
        this.item = undefined;
    }
        
    public removeHazard() : void {
        this.hazard = undefined;
    }

    public getName(): string { return this.name };
    public getDescription(): string { return this.description };
    public getCoordinates(): number[] { return this.coordinates };
    public getItem(): Item | undefined { return this.item };
    public getHazard(): Hazard | undefined { return this.hazard };
}