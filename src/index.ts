import env from "./config/env.js";
import { app } from "./app.js"
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";
import dns from "dns";


dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function startServer(){
  try {

    await connectDB()
    await connectRedis() 

    app.listen(env.PORT, () => {
      console.log("Server is running on port:", env.PORT);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1)
  }
}

startServer()