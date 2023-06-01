import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { SaveFileEvent } from "../impl/save-file-event";
import { join } from "path";
import { existsSync, mkdir, mkdirSync, writeFileSync } from "fs";
import { writeFile } from "fs/promises";
import { generateHash } from "helpers/calculate-hash";
import { promisify } from "util";

@EventsHandler(SaveFileEvent)
export class SaveFileHandler implements IEventHandler<SaveFileEvent> {
  async handle(command: SaveFileEvent) {
    const mkdir = promisify(mkdirSync);
    const writeFileAsync = promisify(writeFile);
    const { userId, image } = command;

    const dirPath = join(__dirname, "..", "avatars", userId);
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true });
    }

    const imagePath = join(dirPath, `${Date.now()}.png`);
    await writeFileAsync(imagePath, image, {});
  }
}
