import PackageManager from '../package-managers/package-manager.ts';
import packageManagers from '../package-managers/index.ts';

export default async function retrievePackageManger(): Promise<PackageManager|undefined> {
    for (const packageManagerClass of packageManagers) {
        const packageManager = new packageManagerClass();
        if (await packageManager.isInstalled()) {
            return packageManager;
        }
    }
    
    return undefined;
}