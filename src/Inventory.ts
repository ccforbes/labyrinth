import Item from "./Item";

export default class Inventory {
    private items: Set<Item>;
    private itemNames: Map<string, Item>;

    constructor() {
        this.items = new Set<Item>();
        this.itemNames = new Map<string, Item>();
    }

    // check if item exists in the Inventory
    public hasItem(itemName: string): boolean {
        const item: Item | undefined = this.itemNames.get(itemName);
        if (!item) {
            return false;
        }
        return true;
    }

    // add item into the inventory
    public addItem(newItem: Item): void {
        this.items.add(newItem);
        this.itemNames.set(newItem.getName(), newItem);
    }

    // get the item from the inventory
    public getItem(itemName: string): Item | undefined {
        return this.itemNames.get(itemName);
    }

    // getters
    public getItems(): Set<Item> { return this.items };
    public getItemNames(): Map<string, Item> { return this.itemNames };
}