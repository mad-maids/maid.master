import PackageManager from './package-managers/package-manager.ts'
import retrievePackageManager from './util/retrieve-package-manager.ts'
import messages from './messages/index.ts';

const args: string[] = Deno.args;

if (args.length == 0) {
  messages.help();
  Deno.exit(1);
}

const packageManager: PackageManager | undefined = await retrievePackageManager();

// TODO: beautify this
if (packageManager == undefined) {
  console.log('None package manager found');
  Deno.exit(1);
} else {
  console.log(`Package manager found! It is ${packageManager.name}. It is supported by OS ${packageManager.osSupported.join(', ')}.`);
}

switch (args[0]) {
  case 'i':
  case 'install':
    console.log('installing...');
    packageManager.install(args.slice(1));
    break;
  case 'ui':
  case 'uninstall':
    console.log('uninstalling...');
    packageManager.uninstall(args.slice(1));
    break;
  case 's':
  case 'search':
    console.log('searching...');
    packageManager.search(args.slice(1));
    break;
  default:
    messages.help();
    Deno.exit(1);
}
