#!/usr/bin/env -S deno -q run --allow-all

import messages from './messages/index.ts'

const args: string[] = Deno.args;

if (args.length == 0) {
  messages.help();
  Deno.exit(1);
}

// TOOD: write argument parser and handle

switch (args[0]) {
  case 'install':
    break;
  case 'uninstall':
    break;
  case 'search':
    break;
  default:
    messages.help();
    Deno.exit(1);
}
