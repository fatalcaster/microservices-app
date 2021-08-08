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
