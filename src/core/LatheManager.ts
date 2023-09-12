import { Lathe } from './Lathe'
import { Item, ItemID, ItemObject } from './Item'

/**
 * All lathes.
 */
export interface Lathes {
    // This lathe creates items
    createItem: Lathe<ItemID, Item, Item>

    // This lathe converts items into objects
    convertItem: Lathe<Item, ItemObject, ItemObject>

    // This lathe converts objects into items
    convertObject: Lathe<ItemObject, Item, Item>
}

/**
 * Lathe manager.
 */
export class LatheManager {
    /**
     * Lathes.
     * @private
     */
    private readonly lathes: Lathes = {
        createItem: new Lathe<ItemID, Item, Item>((id): Item => new Item(id)),
        convertItem: new Lathe<Item, ItemObject, ItemObject>(
            (item): ItemObject => ({
                id: item.getId(),
            }),
        ),
        convertObject: new Lathe<ItemObject, Item, Item>(
            (object): Item => new Item(object.id),
        ),
    }

    /**
     * Returns a lathe.
     * @param latheName The name of the lathe
     */
    public getLathe<L extends keyof Lathes>(latheName: L): Lathes[L] {
        return this.lathes[latheName]
    }
}