import main from "./bootstrap/init-rpc";

main("rpc_queue")
  .then(() => {
    console.log("RPC server started, listening in rpc_queue");
  })
  .catch((err) => {
    console.error("Error starting RPC server: " + err);
  });
