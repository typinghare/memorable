import { Enhancer } from '../../core/Enhancer'

export interface TimeItemProperties {
    // The timestamp when creating the item
    time: number
}

export class TimeEnhancer extends Enhancer {
    public override init(): void {
        this.lathe('createItem').addSemiDrawing((item) => {
            item.self<TimeItemProperties>().setPropertyValue('time', new Date().getTime())

            return item
        })
    }
}