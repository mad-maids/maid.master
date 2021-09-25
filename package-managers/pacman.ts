import PackageManager from './package-manager.ts';
import run from '../runner/index.ts';
import RunnerOutput from '../runner/output.ts';

export default class PacmanPackageManager implements PackageManager {
    get name(): string {
        return 'pacman';
    }

    get osSupported(): string[] {
        return ['linux'];
    }

    async isInstalled(): Promise<boolean> {
        const output: RunnerOutput = await run([
            'pacman', '--version'
        ]);
        return !output.isError;
    }

    install(): void {}

    uninstall(): void {}

    search(): void {}
}