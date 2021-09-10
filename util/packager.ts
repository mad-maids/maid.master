import { os } from "../constants.ts";

import Brew from "../middleware/brew.ts";
import Pacman from "../middleware/pacman.ts";

export default (): Brew | Pacman => {
  switch (os) {
    case "darwin":
      return new Brew();
    case "linux":
      return new Pacman();
    case "windows":
      return new Pacman();
  }
};
