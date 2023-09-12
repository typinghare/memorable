import * as path from 'path'
import { EnhancerClass } from './core/App'
import { BaseEnhancer } from './enhancer/base'
import { TimeEnhancer } from './enhancer/time'
import { DateEnhancer } from './enhancer/date/DateEnhancer'

export class Constants {
    /**
     * The name of this name.
     */
    public static readonly APP_NAME: string = 'Memorable'

    /**
     * The version of this app.
     */
    public static readonly APP_VERSION: string = '1.0.0'

    /**
     * The path of convention file. Convention is the default configurations.
     */
    public static readonly CONVENTION_FILEPATH = path.join(__dirname, '../convention.json')

    /**
     * Enhancer mapping.
     */
    public static readonly ENHANCER_MAPPING: Record<string, EnhancerClass> = {
        [BaseEnhancer.name]: BaseEnhancer,
        [TimeEnhancer.name]: TimeEnhancer,
        [DateEnhancer.name]: DateEnhancer,
    }
}