import axios from "axios";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

const events: Array<{ type: string; data: any }> = [];

function eventRoutes(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    _options: any,
    done: any
) {
    app.post("/events", (request, reply) => {
        const event: any = request.body;

        events.push(event);

        console.log("EVENT RECEIVED", event.type);

        axios.post("http://posts-service:4000/events", event).catch((err) => {
            console.log(err);
        });
        axios.post("http://comment-service:4001/events", event).catch((err) => {
            console.log(err);
        });
        axios.post("http://query-service:4002/events", event).catch((err) => {
            console.log(err);
        });
        axios.post("http://moderation-service:4003/events", event).catch((err) => {
            console.log(err);
        });
        reply.send({ status: "OK" });
    });

    app.get("/events", (_request, reply) => {
        reply.send(events);
    });

    done();
}

module.exports = eventRoutes;
