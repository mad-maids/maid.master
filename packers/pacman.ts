import { log } from '../mod.ts  '
import { output, run } from '../util/exec.ts'

export default class Pacman {
    packages: string[] = []

    async update(): Promise<void> {
        this.packages = (await output(['pacman', '-Q']))
            .split('\n')
            .map((pack) => {
                return pack.split(' ')[0]
            })
    }

    async list(): Promise<string[]> {
        await this.update()
        return this.packages
    }

    async install(pacman: string): Promise<void> {
        await this.update()
        if ((await this.list()).includes(pacman)) {
            log.warning(`⚠️ The package ${pacman} is already installed!`)
        } else {
            log.info(`⬇️ Installing ${pacman}...`)
            try {
                await run(['pacman', '-S', pacman])
                log.info(`✅ ${pacman} has been successfully installed!`)
            } catch (error) {
                log.error(`🛑 Unable to install: ${error.message}`)
            }
        }
    }

    async uninstall(pacman: string): Promise<void> {
        await this.update()
        if ((await this.list()).includes(pacman)) {
            log.info(`⬇️ Uninstalling ${pacman}...`)
            try {
                await run(['pacman', '-R', pacman])
                log.info(`✅ ${pacman} has been successfully uninstalled!`)
            } catch (error) {
                log.error(`🛑 Unable to uninstall: ${error.message}`)
            }
        } else {
            log.warning(`⚠️ The package ${pacman} is not installed!`)
        }
    }
}
