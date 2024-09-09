// handler must return always a json object
import { Prompts } from "src/types/handler-types";
import { HandlerType } from "src/types/handler-types";

export default async function handleRequest(
  prompts: Prompts,
  prompt: string,
  message?: string
): Promise<any> {
  const handler = prompts.find((p) => p.name === prompt)
    ?.handler as HandlerType;
  if (!handler) {
    throw new Error(`No handler found for prompt: ${prompt}`);
  }
  return handler(message);
}
