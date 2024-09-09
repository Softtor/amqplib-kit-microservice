import toJson from "../helpers/sequelize/to-json.sequelize";

export type HandlerType = (message?: string) => Promise<any>;
export type Prompts = { name: string; handler: HandlerType }[];
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
  return toJson(await handler(message));
}
