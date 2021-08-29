const commands: {
    [key: string]: string[]
} = {
    test: ['deno', 'test', '--allow-all', 'test.ts'],
    run: ['deno', 'run', '--allow-all', 'main.ts'],
    compile: ['deno', 'compile', '--allow-all', '--output', 'stacktion', 'main.ts'],
    format: [
        'prettier',
        '--config',
        '.prettierrc',
        '--write',
        '--check',
        '**/*.ts'
    ],
    lint: ['deno', 'lint']
}
let chosen: string[] | null = null

const args = Deno.args

if (Deno.build.os === 'windows') {
    for (const entry of Object.keys(commands)) {
        commands[entry].unshift('cmd', '/C')
    }
}

if (args.includes('--format')) {
    chosen = commands.format
}

if (args.includes('--lint')) {
    chosen = commands.lint
}

if (args.includes('--run')) {
    chosen = commands.run
}

if (args.includes('--compile')) {
    chosen = commands.compile
}

if (args.includes('--test')) {
    chosen = commands.test
}

if (chosen) {
    const p = Deno.run({
        cmd: chosen,
        stdout: 'piped',
        stderr: 'piped'
    })

    const { code } = await p.status()

    const rawOutput = await p.output()
    const rawError = await p.stderrOutput()

    if (code === 0) {
        await Deno.stdout.write(rawOutput)
    } else {
        const errorString = new TextDecoder().decode(rawError)
        console.log(errorString)
    }

    Deno.exit(code)
} else {
    console.log(`
Welcome to the Stacktion Project Management CLI!

    Usage:
        stacktion [command]

    Commands:
        --run: Run the project
        --compile: Compiles the project
        --format: Format the code
        --lint: Lint the code
        --test: Run the tests
`)
    Deno.exit(1)
}
