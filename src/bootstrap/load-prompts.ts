import fs from "node:fs";
import { Prompts } from "src/shared/handlers/handler-request";

export function loadPrompts(promptsDir: string): Prompts {
  const prompts = fs.readdirSync(promptsDir).map((file) => {
    return require(promptsDir + "/" + file);
  });
  if (!prompts.length) {
    throw new Error("No prompts found");
  }
  return prompts;
}
