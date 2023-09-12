import { Enhancer } from '../../core/enhancer/Enhancer'
import { BaseItemManager } from './BaseItemManager'
import { Command } from '../../core/command/Command'
import { ItemManager } from '../../core/ItemManager'
import { LatheManager } from '../../core/lathe/LatheManager'

export type ItemKey = string

export type ItemValue = string

export interface BaseItemProperties {
    // Key
    key: ItemKey

    // Value
    value: ItemValue
}

export class BaseEnhancer extends Enhancer {
    private readonly baseItemManager = new BaseItemManager()

    public override init(): void {
        this.lathe('createItem').addSemiDrawing((item, material) => {
            if (typeof material === 'object' && material.hasOwnProperty('key') && material.hasOwnProperty('value')) {
                const { key, value } = material
                const baseItem = item.self<BaseItemProperties>()

                baseItem.setPropertyValue('key', key)
                baseItem.self<BaseItemProperties>().setPropertyValue('value', value)
                this.baseItemManager.registerItem(baseItem)
            }

            return item
        })

        this.lathe('convertItem').addSemiDrawing((object, _, item) => {
            const baseObject = object as unknown as BaseItemProperties
            const baseItem = item.self<BaseItemProperties>()
            baseObject.key = baseItem.getPropertyValue('key')
            baseObject.value = baseItem.getPropertyValue('value')

            return object
        })

        this.lathe('convertObject').addSemiDrawing((item, _, object) => {
            const baseItem = item.self<BaseItemProperties>()
            const baseObject = object as unknown as BaseItemProperties
            baseItem.setPropertyValue('key', baseObject.key)
            baseItem.setPropertyValue('value', baseObject.value)

            return item
        })

        this.registerCommands()
    }

    private registerCommands(): void {
        // $ new [key] [value]
        const itemManager = this.app.getSingleton(ItemManager)
        const latheManager = this.app.getSingleton(LatheManager)
        this.app.registerCommand(new Command('new', 2, ([key, value]): void => {
            const item = itemManager.createItem<BaseItemProperties>({ key, value })
            console.log(latheManager.getLathe('printItem').process(item))
        }))

        // $ find [key]
        this.app.registerCommand(new Command('find', 1, ([key]): void => {
            const itemArray = this.baseItemManager.getByKey(key)

            if (itemArray.length === 1) {
                const item = itemArray[0]
                console.log(latheManager.getLathe('printItem').process(item))
            } else {

            }
        }))

        // $ mem val [id]
        this.app.registerCommand(new Command('val', 1, ([id]): void => {
            const numId = parseInt(id)
            const item = itemManager.getById(numId)
            const value = item.self<BaseItemProperties>().getPropertyValue('value')

            console.log(value.toString())
        }))
    }
}