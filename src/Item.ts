export default class Item {
    constructor(
        private name: string,
        private description: string,
        private isAWeapon: boolean,
        private isAKey: boolean,
        private isTheTreasure: boolean,
    ){}

    // getters
    public getName(): string { return this.name };
    public getDescription(): string { return this.description };
    public isKey(): boolean { return this.isAKey };
    public isTreasure(): boolean { return this.isTheTreasure };
    public isWeapon(): boolean { return this.isAWeapon };
}