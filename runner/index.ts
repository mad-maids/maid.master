import RunnerOutput from './output.ts';

export default async function run(cmd: string[] = []): Promise<RunnerOutput> {
    try {
        const p = Deno.run({
            cmd,
            stdout: "piped",
            stderr: "piped",
        });

        const { code } = await p.status();

        const rawOutput = await p.output();
        const rawError = await p.stderrOutput();

        if (code === 0) {
            return new RunnerOutput(code, rawOutput);
        } else {
            return new RunnerOutput(code, rawError);
        }
    } catch (e) {
        return new RunnerOutput(1, e.message);
    }
}