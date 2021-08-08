import { randomBytes } from "crypto";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ReplyType, RequestType } from "../common/types/types";
import { postPostOpts } from "../schema/postSchema";
import axios from "axios";

const posts: { [id: string]: { id: string; title: string } } = {};

function postRoutes(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    _options: any,
    done: any
) {
    // Get all posts
    app.get("/posts", async (_request: RequestType, reply: ReplyType) => {
        console.log("Test");
        reply.send(posts);
    });

    app.post(
        "/posts",
        postPostOpts,
        async (request: RequestType, reply: ReplyType) => {
            const id = randomBytes(4).toString("hex");
            const title = (request.body as Post).title;
            console.log(title);
            posts[id] = {
                id,
                title,
            };

            await axios.post("http://event-bus-service:4005/events", {
                type: "PostCreated",
                data: {
                    id,
                    title,
                },
            });

            reply.status(201).send(posts[id]);
        }
    );

    app.post("/events", (request, reply) => {
        console.log(
            "Received Event",
            (request.body as { type: string; data: any }).type
        );

        reply.send({});
    });

    done();
}

module.exports = postRoutes;
