import { log } from './mod.ts'
import { os } from './constants.ts'

const commands = (): string[] => {
    switch (os) {
        case 'windows':
            return ['cmd', '/c', 'scoop']
        case 'darwin':
            return ['brew']
        case 'linux':
            return ['yay']
    }
}

const process = async () => {
    const p = Deno.run({
        cmd: commands(),
        stdout: 'piped',
        stderr: 'piped'
    })

    const { code } = await p.status()
    if (code === 0) {
        return true
    } else {
        return false
    }
}

export const findPackageManager = async () => {
    if (await process()) {
        return false
    }

    if (!(await process())) {
        log.error('Package manager not found!')
        return true
    }
}
