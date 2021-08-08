import axios from "axios";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { CommentStatus } from "../common/types";

function eventRoutes(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    _options: any,
    done: any
) {
    app.post("/events", async (request, reply) => {
        const { type, data } = request.body as { type: string; data: any };

        if (type === "CommentCreated") {
            const status = data.content.includes("orange")
                ? CommentStatus.rejected
                : CommentStatus.approved;

            if (status === CommentStatus.rejected) {
                console.log("\nComment contains ORANGE\n");
            } else {
                console.log("Comment Status", status.toString());
            }

            await axios.post("http://event-bus-service:4005/events", {
                type: "CommentModerated",
                data: {
                    id: data.id,
                    postId: data.postId,
                    status,
                    content: data.content,
                },
            });
        }

        reply.send({});
    });

    done();
}

module.exports = eventRoutes;
