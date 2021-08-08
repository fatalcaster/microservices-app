import axios from "axios";
import React, { useEffect, useState } from "react";

interface CommentListProps {
    comments: Array<Comment>;
}

export type Comment = {
    id: string;
    content: string;
};

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return <ul>{renderedComments}</ul>;
};
