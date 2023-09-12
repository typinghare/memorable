import { Enhancer } from '../../core/Enhancer'

export type ItemKey = string

export type ItemValue = string

export interface BaseItemProperties {
    // Key
    key: ItemKey

    // Value
    value: ItemValue
}

export class BaseEnhancer extends Enhancer {
    public override init(): void {
        this.lathe('createItem').addSemiDrawing((item, material) => {
            const { key, value } = material as BaseItemProperties
            item.self<BaseItemProperties>().setPropertyValue('key', key)
            item.self<BaseItemProperties>().setPropertyValue('value', value)

            return item
        })
    }
}