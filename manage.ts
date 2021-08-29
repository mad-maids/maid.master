const commands: {
    [key: string]: string[]
} = {
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
        --format: Format the code
        --lint: Lint the code
`)
    Deno.exit(1)
}
