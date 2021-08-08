import { CommentStatus, Comment } from "../types";

export const posts: {
    [id: string]: {
        id: string;
        title: string;
        comments: Array<Comment>;
    };
} = {};

export const handleEvent = (type: string, data: any) => {
    if (type === "PostCreated") {
        const { id, title } = data as { id: string; title: string };

        posts[id] = { id: id, title: title, comments: [] };
    }

    if (type === "CommentCreated") {
        const { id, content, postId } = data as {
            id: string;
            content: string;
            postId: string;
            status: CommentStatus;
        };

        const post = posts[postId];
        post.comments.push({ id, content, status: data.status });
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find((comment: Comment) => {
            return comment.id === id;
        });
        comment!.status = status;
        comment!.content = content;
    }
};
