import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: true,
});

app.register(require("./routes/posts"));
app.register(require("fastify-cors"), {});

const PORT = 4000;

const start = async () => {
    try {
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Listening on PORT ${PORT}`);
            console.log("v22");
        });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
