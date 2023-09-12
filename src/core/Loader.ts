import * as fs from 'fs'
import { App } from './App'
import { LatheManager } from './lathe/LatheManager'
import { ItemManager } from './ItemManager'

export class Loader {
    /**
     * Creates a loader.
     * @param app
     */
    public constructor(private readonly app: App) {
    }

    /**
     * Loads all item from a specified file.
     * @param filepath The path of the file to load
     */
    public load(filepath: string): void {
        if (!fs.existsSync(filepath)) {
            return
        }

        const content: string = fs.readFileSync(filepath, 'utf-8')
        const itemObjectArray = JSON.parse(content)

        const convertObjectLathe = this.app.getSingleton(LatheManager).getLathe('convertObject')
        const itemManager = this.app.getSingleton(ItemManager)
        for (const itemObject of itemObjectArray) {
            const item = convertObjectLathe.process(itemObject)

            itemManager.register(item)
        }
    }
}