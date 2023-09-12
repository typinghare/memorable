import { Enhancer } from '../../core/enhancer/Enhancer'
import { TimeEnhancer, TimeItemProperties } from '../time'
import moment from 'moment'

export class DateEnhancer extends Enhancer {
    public override init(): void {
        this.require(TimeEnhancer.name)

        this.lathe('printItem').addSemiDrawing((string, _, item) => {
            const time = item.self<TimeItemProperties>().getPropertyValue('time')
            const date = moment(time)
            const dateString = date.format('MMM DD, YYYY')

            string = string.replace(/time: (\d+)/, `date: ${dateString}`)

            return string
        })
    }
}