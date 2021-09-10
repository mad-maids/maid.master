import { isWindows } from "../constants.ts";
import { log } from "../mod.ts";

/**
 * Executes a command and returns the
 * output without pain in the ass.
 * (Yes, I really suffered without this) ಠ_ಠ
 */

export const run = async (
  command: string[],
  success?: string,
  error?: string,
): Promise<void> => {
  if (isWindows) {
    command.unshift("cmd", "/c");
  }
  if (!isWindows) {
    command.unshift("sh", "-c");
  }
  const process = Deno.run({
    cmd: command,
    stderr: "inherit",
    stdout: "inherit",
  });
  if ((await process.status()).code === 0) {
    if (success) {
      log.info(success);
    }
  } else {
    if (error) {
      log.error(error);
    }
  }
};

export const output = async (command: string[]): Promise<string> => {
  if (isWindows) {
    command.unshift("cmd", "/c");
  }
  if (!isWindows) {
    command.unshift("sh", "-c");
  }
  const process = Deno.run({
    cmd: command,
    stdout: "piped",
  });
  const output = await process.output();
  return new TextDecoder().decode(output);
};

export default { run, output };
