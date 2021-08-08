import axios from "axios";
import React from "react";
import { useState } from "react";

interface CommentCreateProps {
    postId: string;
}

const CommentCreate: React.FC<CommentCreateProps> = ({ postId }) => {
    const [content, setContent] = useState("");

    const onSubmit = async (event: any) => {
        event.preventDefault();

        await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content,
        });

        setContent("");
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    />
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;
