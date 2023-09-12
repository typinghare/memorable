import { DataCollection, Datum, Metadata } from '@typinghare/extrum'
import { BaseEnhancer } from '../enhancer/base'

export interface Config {
    userConfigFilepath: string

    enhancerList: string[]

    dataFilepath: string

    serverPort: number
}

export interface ConfigMetadata extends Metadata {
    description: string
}

export class Configuration extends DataCollection<Config> {
    public constructor() {
        super({
            userConfigFilepath: new Datum<string, ConfigMetadata>('~/.mem/config.json', {
                description: 'The path of user configuration file.',
            }),
            enhancerList: new Datum<string[], ConfigMetadata>([
                BaseEnhancer.name,
            ], {
                description: 'The list of enhancers.',
            }),
            dataFilepath: new Datum<string, ConfigMetadata>('~/.mem/data.json', {
                description: 'The path of data file.',
            }),
            serverPort: new Datum<number, ConfigMetadata>(9050, {
                description: 'The listening port of server.',
            }),
        })
    }

    public load(config: Partial<Config>): void {
        const data = this.getData()
        const keyList = Object.keys(data)

        for (const key of keyList) {
            if (key in config) {
                // @ts-ignore
                (data[key] as Datum).value = config[key]
            }
        }
    }
}