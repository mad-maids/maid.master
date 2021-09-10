import { log } from "../mod.ts  ";
import { output, run } from "../util/exec.ts";

export default class Brew {
  packages: string[] = [];

  async update(): Promise<void> {
    this.packages = (await output(["scoop list"]))
      .replace(/==>\s*(Casks|Formulae)\s*/g, "")
      .split("\n")
      .map((pack) => {
        if (pack.includes("@")) {
          return pack.split("@")[0];
        } else {
          return pack;
        }
      });
  }

  async list(): Promise<string[]> {
    await this.update();
    return this.packages;
  }

  async install(brew: string): Promise<void> {
    await this.update();
    if ((await this.list()).includes(brew)) {
      log.warning(`⚠️ The package ${brew} is already installed!`);
    } else {
      log.info(`⬇️ Installing ${brew}...`);
      try {
        await run([`brew install ${brew}`]);
        log.info(`✅ ${brew} has been successfully installed!`);
      } catch (error) {
        log.error(`🛑 Unable to install: ${error.message}`);
      }
    }
  }

  async uninstall(brew: string): Promise<void> {
    await this.update();
    if ((await this.list()).includes(brew)) {
      log.info(`⬇️ Uninstalling ${brew}...`);
      try {
        await run([`brew uninstall ${brew}`]);
        log.info(`✅ ${brew} has been successfully uninstalled!`);
      } catch (error) {
        log.error(`🛑 Unable to uninstall: ${error.message}`);
      }
    } else {
      log.warning(`⚠️ The package ${brew} is not installed!`);
    }
  }
}
