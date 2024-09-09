import fs from "node:fs";
import ampq from "amqplib";
import handleRequest, { Prompts } from "../shared/handlers/handler-request";
import { RABBITMQ_HOST, RABBITMQ_PORT, PROMPTS_DIR } from "./environment";

const RABBITMQ_URL = `amqp://${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

// resolve prompts dir loading all prompts files
const prompts: Prompts = fs.readdirSync(PROMPTS_DIR).map((file) => {
  return require(PROMPTS_DIR + "/" + file);
});

async function main() {
  const connection = await ampq.connect(RABBITMQ_URL, {});
  const channel = await connection.createChannel();

  await channel.assertQueue("process_queue", { durable: false });

  await channel.consume("process_queue", async (message) => {
    if (!message) return;
    const { pattern, data } = JSON.parse(message.content.toString());
    try {
      const response = await handleRequest(prompts, pattern.cmd, data);

      channel.sendToQueue(
        message.properties.replyTo,
        Buffer.from(JSON.stringify(response)),
        {
          correlationId: message.properties.correlationId,
        }
      );
    } catch (err) {
      console.error("Error handling request: " + err);
    }
    channel.ack(message);
  });
}

export default function startRpcServer() {
  main()
    .then(() => console.log("RPC Server started"))
    .catch((err) => console.error("Error starting RPC Server" + err));
}
