import main from "./bootstrap/init-rpc";
// This is for example purposes only, in a real application you would use a more specific queue name
main("rpc_queue", "./prompts", "amqp://localhost:5672")
  .then(() => {
    console.log("RPC server started, listening in rpc_queue");
  })
  .catch((err) => {
    console.error("Error starting RPC server: " + err);
  });
