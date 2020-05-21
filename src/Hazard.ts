import Item from "./Item";

export default class Hazard {
    constructor(
        private name: string, 
        private description: string, 
        private key: Item
    ) {}

    // getters
    public getName() { return this.name };
    public getDescription() { return this.description };
    public getHazardKey() { return this.key };
}