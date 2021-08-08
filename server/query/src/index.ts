import axios from "axios";
import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { handleEvent } from "./routes/helpers";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: true,
});

app.register(require("./routes/queries"));
app.register(require("fastify-cors"), {});

const PORT = 4002;

const start = async () => {
    try {
        app.listen(PORT, "0.0.0.0", async () => {
            console.log(`Listening on PORT ${PORT}`);

            const res = await axios.get("http://event-bus-service:4005/events");
            for (let event of res.data) {
                console.log("Processing event:", event.type);

                handleEvent(event.type, event.data);
            }
        });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
