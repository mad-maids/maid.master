import { log } from "../mod.ts";
import exec from "../exec.ts";

export const pacman = async (
  task: "install" | "uninstall" | "init",
  pack?: string,
): Promise<void> => {
  switch (task) {
    case "init":
      await init();
      break;
    case "install":
    case "uninstall":
      if (pack) {
        switch (task) {
          case "install":
            await install(pack);
            break;
          case "uninstall":
            await uninstall(pack);
            break;
        }
      }
      break;
    default:
      log.error(`Invalid task: ${task}`);
  }
};

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

  // Install git if it doesn't exist
  if (exists("git")) {
    log.info("Git is already installed!");
  } else {
    await exec(
      ["sudo", "pacman", "-S", "git", "--noconfirm"],
      "Git was installed successfully!",
      "Git failed with installing!",
    );
  }

  // Install the yay package manager
  await exec(
    ["git", "clone", "https://aur.archlinux.org/yay.git"],
    "Successfully cloned the yay repository...",
    "Failed with cloning yay repository",
  );

  await exec(
    ["cd", "yay", "&&", "makepkg", "-si", "--noconfirm"],
    "Successfully install the yay package manager",
    "Failed with installing the yay manager!",
  );

  Deno.chdir(oldPath);
};
