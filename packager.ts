import { os } from './constants.ts'

export default () => {
    switch (os) {
        case 'darwin':
            return 'brew'
        case 'linux':
            return 'yay'
        case 'windows':
            return 'scoop'
    }
}
