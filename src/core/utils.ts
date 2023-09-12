import * as os from 'os'
import * as path from 'path'

export function getAbsolutePath(relativePath: string): string {
    if (relativePath.startsWith('~')) {
        relativePath = os.homedir() + '/' + relativePath.substring(1)
    }

    return path.resolve(relativePath)
}