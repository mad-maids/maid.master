import { log } from "../mod.ts";

export const exists = async (app: string): Promise<boolean | undefined> => {
  if (app) {
    const { output } = await Deno.run({
      cmd: [
        "pacman",
        "-Q",
        app,
      ],
    });
    return output.toString().includes(app);
  }

  if (!app) {
    throw new Error("Package name was not provided!");
  }
};

export const install = async (app: string): Promise<void> => {
  if (app) {
    await Deno.run({
      cmd: [
        "sudo",
        "pacman",
        "-S",
        app,
      ],
    });
  }

  if (!app) {
    throw new Error("Package name was not provided!");
  }
};

export const uninstall = async (app: string): Promise<void> => {
  if (app) {
    await Deno.run({
      cmd: [
        "sudo",
        "pacman",
        "-Rcns",
        app,
      ],
    });
  }

  if (!app) {
    throw new Error("Package name was not provided!");
  }
};

export const init = async (): Promise<void> => {
  const oldPath = Deno.cwd();
  Deno.chdir(Deno.env.get("HOME") ?? "~");
  const git = Deno.run({
    cmd: ["sudo", "pacman", "-S", "git", "--noconfirm"],
  });

  if ((await git.status()).code === 0) {
    log.info("Git was installed!");
  } else {
    log.error("Git was not installed!");
    Deno.exit(1)
  }

  
};
