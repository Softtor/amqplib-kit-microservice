import fs from "node:fs";
import { Prompts } from "../types/handler-types";

export function loadPrompts(promptsDir: string): Prompts {
  const prompts = fs.readdirSync(promptsDir).map((file) => {
    return require(promptsDir + "/" + file);
  });
  if (!prompts.length) {
    throw new Error("No prompts found");
  }
  return prompts;
}
