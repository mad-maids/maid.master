/**
 * The place where I test some of
 * my ideas which might be dumb to
 * put in production code. Sorry,
 * if I broke your mind with my
 * stupid code here ^_^
 */

const p = Deno.run({
  cmd: ["cmd", "/c", "scoops"],
  stdout: "piped",
  stderr: "piped",
});

const { code } = await p.status();

// Reading the outputs closes their pipes
const rawOutput = await p.output();
const rawError = await p.stderrOutput();

if (code === 0) {
  await console.log(code);
  await Deno.stdout.write(rawOutput);
} else {
  await console.log(code);
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
