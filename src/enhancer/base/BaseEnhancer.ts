import { Enhancer } from '../../core/enhancer/Enhancer'
import { BaseItemManager } from './BaseItemManager'
import { Command } from '../../core/command/Command'
import { ItemManager } from '../../core/ItemManager'
import { LatheManager } from '../../core/lathe/LatheManager'
import { IdUtil } from '../../core/util/IdUtil'
import { Item } from '../../core/Item'

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
        this.lathe('registerItem').addSemiDrawing(item => {
            this.baseItemManager.registerItem(item as Item<BaseItemProperties>)

            return item
        })

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
        this.app.registerCommand(new Command('new', 2, ([key, value], execution): void => {
            const item = itemManager.createItem<BaseItemProperties>({ key, value })
            execution.log(latheManager.getLathe('printItem').process(item))
        }))

        // $ find [key]
        this.app.registerCommand(new Command('find', 1, ([key], execution): void => {
            const itemArray = this.baseItemManager.getByKey(key)

            if (itemArray.length === 1) {
                const item = itemArray[0]
                execution.log(latheManager.getLathe('printItem').process(item))
            } else {

            }
        }))

        // $ mem val [id | key]
        this.app.registerCommand(new Command('val', 1, ([idString], execution): void => {
            const id = IdUtil.parseId(idString)
            if (IdUtil.isLegalId(id)) {
                // ID
                const item = itemManager.getById(id)
                const value = item.self<BaseItemProperties>().getPropertyValue('value')

                execution.log(value.toString())
            } else {
                // key
                const itemList = this.baseItemManager.getByKey(idString)

                execution.log('[\n')
                for (const item of itemList) {
                    const value = item.self<BaseItemProperties>().getPropertyValue('value')
                    execution.log(
                        `  (@${item.getId()}) ${value}\n`,
                    )
                }
                execution.log(']\n')
            }
        }))
    }
}