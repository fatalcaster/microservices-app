import { randomBytes } from "crypto";
import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import {
    ReplyType,
    RequestType,
    Comment,
    CommentStatus,
} from "../common/types/types";
import axios from "axios";

const commentsByPostId: {
    [id: string]: Array<Comment>;
} = {};

function postRoutes(
    app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
    _options: any,
    done: any
) {
    // Get all posts
    app.get(
        "/posts/:id/comments",
        async (request: RequestType, reply: ReplyType) => {
            reply.send(
                commentsByPostId[(request.params as { id: string }).id] || []
            );
        }
    );

    app.post(
        "/posts/:id/comments",
        async (request: RequestType, reply: ReplyType) => {
            const commentId = randomBytes(4).toString("hex");
            const content = (request.body as Comment).content;

            const comments =
                commentsByPostId[(request.params as Comment).id] || [];

            comments.push({
                id: commentId,
                content,
                status: CommentStatus.pending,
            });

            commentsByPostId[(request.params as { id: string }).id] = comments;

            await axios.post("http://event-bus-service:4005/events", {
                type: "CommentCreated",
                data: {
                    id: commentId,
                    content,
                    postId: (request.params as Comment).id,
                    status: CommentStatus.pending,
                },
            });

            reply.status(201).send(comments);
        }
    );

    app.post("/events", async (request, reply) => {
        const { type, data } = request.body as { type: string; data: any };

        if (type === "CommentModerated") {
            const { postId, id, status } = data;
            const comments = commentsByPostId[postId];

            const comment = comments.find((comment) => {
                return comment.id === id;
            });

            comment!.status = status;

            await axios.post("http://event-bus-service:4005/events", {
                type: "CommentUpdated",
                data: {
                    id,
                    status,
                    postId,
                    content: comment!.content,
                },
            });
        }

        reply.send({});
    });

    done();
}

module.exports = postRoutes;
