/**
 * The place where I test some of
 * my ideas which might be dumb to
 * put in production code. Sorry,
 * if I broke your mind with my
 * stupid code here ^_^
 */

import Packager from "./util/packager.ts"

const packageManager = Packager();
const list = await packageManager.list()
await packageManager.install('go')
console.log(list)