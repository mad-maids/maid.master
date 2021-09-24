#!/usr/bin/env -S deno -q run --allow-all

import messages from './messages/index.ts'

const args: string[] = Deno.args;

if (args.length == 0) {
  messages.help();
  Deno.exit(1);
}

// TOOD: write argument parser and handle

let chosen: string[] | null = null;
const commands: {
  commands: { [key: string]: string[] };
} = JSON.parse(await Deno.readTextFile("./commands.json"));

if (Deno.build.os === "windows") {
  for (const entry of Object.keys(commands.commands)) {
    commands.commands[entry].unshift("cmd", "/C");
  }
}

chosen = commands.commands[args[0].toString().replace(/\-\-/gi, "")];

if (chosen) {
  const p = Deno.run({
    cmd: chosen,
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await p.status();

  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
  } else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  Deno.exit(code);
} else {
  messages.help();
  Deno.exit(1);
}
