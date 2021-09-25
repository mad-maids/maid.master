export default interface PackageManager {
    name: string,
    osSupported: string[],
    isInstalled(): Promise<boolean>
    install(args: string[]): void
    uninstall(args: string[]): void
    search(args: string[]): void 
}