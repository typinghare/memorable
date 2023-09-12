import { Enhancer } from '../../core/Enhancer'
import { BaseItemManager } from './BaseItemManager'
import { Command } from '../../core/command/Command'

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

        this.registerCommands()
    }

    private registerCommands(): void {
        // $ new [key] [value]
        this.app.registerCommand(new Command('new', 2, ([key, value]): void => {
            const item = this.app.getItemManger().createItem<BaseItemProperties>({ key, value })
            console.log(this.app.getLatheManager().getLathe('printItem').process(item))
        }))

        // $ find [key]
        this.app.registerCommand(new Command('find', 1, ([key, value]): void => {
            this.app.getItemManger().createItem<BaseItemProperties>({ key, value })
        }))

        // $ mem val [id]
        this.app.registerCommand(new Command('val', 1, ([key, value]): void => {
            this.app.getItemManger().createItem<BaseItemProperties>({ key, value })
        }))
    }
}