import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export type ReplyType = FastifyReply<
    Server,
    IncomingMessage,
    ServerResponse,
    RouteGenericInterface,
    unknown
>;

export type RequestType = FastifyRequest<
    RouteGenericInterface,
    Server,
    IncomingMessage
>;

export type Comment = {
    id: string;
    content: string;
    status: CommentStatus;
};

export enum CommentStatus {
    pending,
    rejected,
    approved,
}
