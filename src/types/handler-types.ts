export type HandlerType = (message?: string) => Promise<string>;
export type Prompts = { name: string; handler: HandlerType }[];
