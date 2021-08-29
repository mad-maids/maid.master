export const argies: string[] = Deno.args
export const os: 'darwin' | 'linux' | 'windows' = Deno.build.os
export const isWindows: boolean = os === 'windows'
