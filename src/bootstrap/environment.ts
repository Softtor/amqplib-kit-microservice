import env from "env-var";

const { get } = env;

export const RABBITMQ_HOST = get("RABBITMQ_HOST").required().asString();
export const RABBITMQ_PORT = get("RABBITMQ_PORT").required().asPortNumber();
export const PROMPTS_DIR = get("PROMPTS_DIR").required().asString();
