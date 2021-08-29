import { log, sub } from '../mod.ts'
import exec from '../exec.ts'

export const pacman = async (
    task: 'install' | 'uninstall' | 'init',
    pack?: string
): Promise<void> => {
    switch (task) {
        case 'init':
            await init()
            break
        case 'install':
        case 'uninstall':
            if (pack) {
                switch (task) {
                    case 'install':
                        await install(pack)
                        break
                    case 'uninstall':
                        await uninstall(pack)
                        break
                }
            }
            break
        default:
            log.error(`Invalid task: ${task}`)
    }
}

export const exists = async (app: string): Promise<boolean | undefined> => {
    if (app) {
        const result = await sub.output(['pacman', '-Q'])
        return result.includes(app)
    }

    if (!app) {
        throw new Error('Package name was not provided!')
    }
}

export const install = async (app: string): Promise<void> => {
    if (app) {
        await Deno.run({
            cmd: ['sudo', 'pacman', '-S', app]
        })
    }

    if (!app) {
        throw new Error('Package name was not provided!')
    }
}

export const uninstall = async (app: string): Promise<void> => {
    if (app) {
        await Deno.run({
            cmd: ['sudo', 'pacman', '-Rcns', app]
        })
    }

    if (!app) {
        throw new Error('Package name was not provided!')
    }
}

export const init = async (): Promise<void> => {
    // Install git if it doesn't exist
    if (await exists('git')) {
        log.warning('Git is already installed!')
    } else {
        await exec(
            ['sudo', 'pacman', '-S', 'git', '--noconfirm'],
            'Git was installed successfully!',
            'Git failed with installing!'
        )
    }

    // Install the yay package manager
    if (await exists('yay')) {
        log.warning('Yay is already installed!')
    } else {
        await exec(
            ['git', 'clone', 'https://aur.archlinux.org/yay.git', '.yay'],
            'Successfully cloned the yay repository...',
            'Failed with cloning yay repository'
        )

        // Enter the darkness
        await Deno.chdir('.yay')

        await exec(
            ['makepkg', '-si', '--noconfirm'],
            'Successfully installed the yay package manager',
            'Failed with installing the yay manager!'
        )

        // Exit the darkness
        await Deno.chdir('..')

        // Clean up
        await Deno.remove('.yay')
        // await exec(
        //   ["rm", "-rf", "yay"],
        //   "Successfully removed the yay repository",
        //   "Failed with removing the yay repository",
        // );
    }
}
