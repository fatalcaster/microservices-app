export const getPostsOpts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                    },
                },
            },
        },
    },
};

export const postPostOpts = {
    schema: {
        response: {
            201: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                },
            },
        },
    },
};
