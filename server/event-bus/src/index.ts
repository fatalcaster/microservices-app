import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: true,
});

app.register(require("./routes/events"));

const PORT = 4005;

const start = async () => {
    try {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Listening on PORT ${PORT}`);
        });
    } catch (error) {
        app.log.error(error);
        // process.exit(1);
    }
};

start();
