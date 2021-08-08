import React, { useState } from "react";
import "./PostCreate.css";
import axios from "axios";

interface PostCreateProps {}

const PostCreate: React.FC<PostCreateProps> = () => {
    const [title, setTitle] = useState("");

    const onSubmit = async (event: any) => {
        event!.preventDefault();

        await axios.post("http://localhost:4000/posts", {
            title,
        });

        setTitle("");
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};

export default PostCreate;
