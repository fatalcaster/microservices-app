import React from "react";
import PostCreate from "./PostCreate";
import "./App.css";
import PostList from "./PostList";

interface AppProps {}

export const App: React.FC<AppProps> = () => {
    return (
        <div className="container">
            <h1>CreatePost</h1>
            <PostCreate />
            <hr />
            <h1>Posts</h1>
            <PostList />
        </div>
    );
};
