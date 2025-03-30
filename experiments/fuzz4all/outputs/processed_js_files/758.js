 

const apiHandler = {
    async get(target, prop) {
        if (typeof prop === 'string') {
            return async (params = {}) => {
                const query = new URLSearchParams(params).toString();
                const response = await fetch(`${target.url}/${prop}?${query}`);
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            };
        }
    },
};

const createApiClient = (baseUrl) => {
    return new Proxy({ url: baseUrl }, apiHandler);
};

(async () => {
    const apiClient = createApiClient('https://jsonplaceholder.typicode.com');

    try {
        const posts = await apiClient.posts({ userId: 1 });
        print(posts);

        const comments = await apiClient.comments({ postId: 1 });
        print(comments);
    } catch (error) {
        console.error('Error:', error);
    }
})();
