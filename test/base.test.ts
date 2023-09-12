import { App } from '../src/core/App'
import { BaseEnhancer } from '../src/enhancer/base/BaseEnhancer'
import { TimeEnhancer } from '../src/enhancer/time/TimeEnhancer'

describe('Base', () => {
    it('Base Test', () => {
        const app = new App()
        app.loadEnhancer(BaseEnhancer)
        app.loadEnhancer(TimeEnhancer)

        const item = app.getItemManger().createItem({
            key: 'token',
            value: '123456'
        })

        console.log(item)
    })
})