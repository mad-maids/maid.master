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
            console.log(`  ⚠  The package ${pacman} is already installed!`)
        } else {
            const spinner = Spinner.default.getInstance()
            spinner.setSpinnerType('clock')
            spinner.start(`Installing ${pacman}...\n`)
            try {
                await run(['pacman', '-S', pacman])
                await spinner.succeed(`${pacman} installed!`)
            } catch (e) {
                await spinner.fail(`Failed to install ${pacman}!`)
                throw e
            }
        }
    }
}
