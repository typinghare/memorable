export type ItemPropertyKey = string

export type ItemProperties = Record<ItemPropertyKey, any>

export type ItemID = number

/**
 * Item object.
 */
export interface ItemObject {
    id: ItemID
}

/**
 * An item consists of a key and a value.
 * @template P The properties of the item
 */
export class Item<P extends ItemProperties = {}> {
    /**
     * Properties of this item.
     * @private
     */
    private readonly properties: P = {} as P

    /**
     * Creates an item.
     * @param id The ID of this item
     */
    public constructor(private readonly id: ItemID) {
    }

    /**
     * Returns the ID of this item.
     */
    public getId(): ItemID {
        return this.id
    }

    /**
     * Returns the reference of self.
     */
    public self<CP extends ItemProperties = P>(): Item<CP> {
        return this as unknown as Item<CP>
    }

    /**
     * Returns the properties of this item.
     */
    public getProperties<CP = P>(): CP {
        return this.properties as unknown as CP
    }

    /**
     * Returns the value of a property.
     * @param key The property key
     */
    public getPropertyValue<K extends keyof P, T extends P[K]>(key: K): T {
        return this.properties[key]
    }

    /**
     * Sets the value of a property
     * @param key The property key
     * @param value The property value
     */
    public setPropertyValue<K extends keyof P, T extends P[K]>(key: K, value: T): void {
        this.properties[key] = value
    }
}