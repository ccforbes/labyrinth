import Item from "./Item";
import Hazard from "./Hazard";

export default class AreaAssets {
    constructor(
        private item?: Item,
        private hazard?: Hazard
    ) {}

    // getters
    public getItem(): Item | undefined { return this.item };
    public getHazard(): Hazard | undefined { return this.hazard };
}