import Colors from '../util/colors.ts';

export default function(): void {
    console.log(`
Welcome to the ${Colors.blue('Maid Slave')} CLI!

    Usage:
        mc [command]

    Commands:
        doctor: view stats
        --help: view this message
`);
}