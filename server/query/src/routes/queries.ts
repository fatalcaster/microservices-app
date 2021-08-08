import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { handleEvent, posts } from "./helpers";

function eventRoutes(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    _options: any,
    done: any
) {
    app.get("/posts", (_request, reply) => {
        reply.send(posts);
    });

    app.post("/events", (request, reply) => {
        const { type, data } = request.body as { type: string; data: any };

        handleEvent(type, data);

        reply.send({});
    });

    done();
}

module.exports = eventRoutes;
