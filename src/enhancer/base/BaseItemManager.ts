import { Item, ItemPropertyKey } from '../../core/Item'

export type ItemKey = string

/**
 * Base manager.
 */
export class BaseItemManager {
    /**
     * Mapping from item keys to item lists.
     * @private
     */
    private readonly byKey: Map<ItemKey, Item[]> = new Map()

    /**
     * Retrieves items by a specified key.
     * @param key The specified key
     */
    public getByKey(key: ItemKey): Item[] {
        const items = this.byKey.get(key)

        if (!items) {
            throw new Error('Item key does not exist.')
        }

        return items
    }
}