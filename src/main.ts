import * as process from 'process'
import { App } from './core/App'
import { TimeEnhancer } from './enhancer/time'
import { BaseEnhancer } from './enhancer/base'

const argv = process.argv
const args = argv.slice(2)

const app = new App()
app.loadEnhancer(BaseEnhancer)
app.loadEnhancer(TimeEnhancer)

app.executeCommand(args)