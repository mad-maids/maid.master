/**
 * The place where I test some of
 * my ideas which might be dumb to
 * put in production code. Sorry,
 * if I broke your mind with my
 * stupid code here ^_^
 */

// import Pacman from './packers/pacman.ts'
import Brew from './packers/brew.ts'

const packageManager = new Brew()
const list = await packageManager.list()
await packageManager.install('go')
