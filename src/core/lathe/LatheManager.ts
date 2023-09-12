import { Lathe } from './Lathe'
import { Item, ItemID, ItemObject } from '../Item'

/**
 * All lathes.
 */
export interface Lathes {
    // Register item
    registerItem: Lathe<Item, Item, Item>

    // This lathe creates items
    createItem: Lathe<ItemID, Item, Item>

    // This lathe converts items into objects
    convertItem: Lathe<Item, ItemObject, ItemObject>

    // This lathe converts objects into items
    convertObject: Lathe<ItemObject, Item, Item>

    // This lathe converts items into string, which will be printed on the console
    printItem: Lathe<Item, string, string>
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
        registerItem: new Lathe<Item, Item, Item>(),
        createItem: new Lathe<ItemID, Item, Item>((id): Item => new Item(id)),
        convertItem: new Lathe<Item, ItemObject, ItemObject>(
            (item): ItemObject => ({
                id: item.getId(),
            }),
        ),
        convertObject: new Lathe<ItemObject, Item, Item>(
            (object): Item => new Item(object.id),
        ),
        printItem: new Lathe<Item, string, string>(
            (item): string => {
                let str = `(@${item.getId()}) = {\n`
                const properties = item.getProperties()

                for (const propertiesKey in properties) {
                    // @ts-ignore
                    str += '  ' + propertiesKey.toString() + ': ' + properties[propertiesKey] + '\n'
                }

                return str + '}'
            },
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