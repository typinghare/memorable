import { App } from './App'
import * as fs from 'fs'
import { ItemManager } from './ItemManager'
import { LatheManager } from './lathe/LatheManager'
import * as path from 'path'

export class Saver {
    /**
     * Creates a saver.
     * @param app
     */
    public constructor(private readonly app: App) {
    }

    /**
     * Saves all items to a file.
     * @param filepath The path to the file
     */
    public saveAll(filepath: string): void {
        const itemObjectArray: object[] = []

        const convertItemLathe = this.app.getSingleton(LatheManager).getLathe('convertItem')
        const itemManger = this.app.getSingleton(ItemManager)
        for (const item of itemManger.getAllItems()) {
            const object = convertItemLathe.process(item)

            itemObjectArray.push(object)
        }

        const content: string = JSON.stringify(itemObjectArray)

        const dirname = path.dirname(filepath)
        if (fs.existsSync(dirname)) {
            fs.writeFileSync(filepath, content)
        } else {
            throw new Error(`Directory does not exist: [ ${dirname} ].`)
        }
    }
}