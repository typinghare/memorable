import { Item, ItemID } from './Item'
import { App } from './App'
import { LatheManager } from './lathe/LatheManager'

/**
 * Item manager.
 */
export class ItemManager {
    /**
     * Mapping from items' IDs to items.
     * @private
     */
    private readonly byId: Map<ItemID, Item> = new Map()

    /**
     * The max ID.
     * @private
     */
    private maxId: ItemID = 0

    /**
     * Creates an item manager.
     * @param app
     */
    public constructor(private readonly app: App) {
    }

    /**
     * Retrieves an item by a specified ID.
     * @param id The specified ID
     */
    public getById(id: ItemID): Item {
        const item = this.byId.get(id)

        if (!item) {
            throw new Error('Item does not exist.')
        }

        return item
    }

    /**
     * Registers an item.
     */
    public register(item: Item): Item {
        const id = item.getId()
        this.maxId = Math.max(this.maxId, id)
        this.byId.set(id, item)

        return item
    }

    /**
     * Creates an item.
     * @param material material
     */
    public createItem<M = any>(material?: M): Item {
        const id = ++this.maxId
        const item = this.app
            .getSingleton(LatheManager)
            .getLathe('createItem')
            .process(id, material)

        return this.register(item)
    }

    /**
     * Returns all items.
     */
    public getAllItems(): IterableIterator<Item> {
        return this.byId.values()
    }
}