import { isWindows } from "./constants.ts";
import { log } from "./mod.ts";

/**
 * Executes a command and returns the
 * output without pain in the ass.
 * (Yes, I really suffered without this) ಠ_ಠ
 */

export default async (
  command: string[],
  success?: string,
  error?: string,
): Promise<void> => {
  if (isWindows) {
    command.unshift("cmd", "/c");
  }

  const process = Deno.run({
    cmd: command,
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
