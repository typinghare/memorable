import { Item } from '../../core/Item'
import { BaseItemProperties, ItemKey } from './BaseEnhancer'

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
     * Registers an item.
     */
    public registerItem(item: Item<BaseItemProperties>): Item {
        const key = item.self<BaseItemProperties>().getPropertyValue('key')
        const itemList = this.byKey.get(key)

        if (itemList) {
            itemList.push(item)
        } else {
            this.byKey.set(key, [item])
        }

        return item
    }

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