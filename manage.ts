#!/usr/bin/env -S deno -q run --allow-all

const args = Deno.args
let chosen: string[] | null = null
const commands: {
    commands: { [key: string]: string[] }
} = JSON.parse(await Deno.readTextFile('./commands.json'))

if (Deno.build.os === 'windows') {
    for (const entry of Object.keys(commands.commands)) {
        commands.commands[entry].unshift('cmd', '/C')
    }
}

chosen = commands.commands[args[0].toString().replace(/\-\-/gi, '')]

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
