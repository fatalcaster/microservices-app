import axios from "axios";
import React, { useState, useEffect } from "react";
import CommentCreate from "./CommentCreate";
import { CommentList } from "./CommentList";

interface PostListProps {}

type Post = {
    id: string;
    title: string;
};

const PostList: React.FC<PostListProps> = () => {
    const [posts, setPosts] = useState<{
        [id: string]: {
            id: string;
            title: string;
            comments: Array<{ id: string; content: string }>;
        };
    }>({});

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4002/posts");
        console.log(res.data);
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                style={{ width: "30%", marginBottom: "20px" }}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return <div className="post-list">{renderedPosts}</div>;
};

export default PostList;
