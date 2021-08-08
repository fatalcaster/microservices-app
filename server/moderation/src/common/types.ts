export enum CommentStatus {
    pending,
    rejected,
    approved,
}

export type Comment = {
    id: string;
    content: string;
    status: CommentStatus;
};
