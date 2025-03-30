 

async function fetchData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const jsonDataPromises = responses.map(response => response.json());
        const data = await Promise.all(jsonDataPromises);

        const [userData, postsData, commentsData] = data;

        const enrichedData = postsData.map(post => {
            return {
                ...post,
                user: userData.find(user => user.id === post.userId),
                comments: commentsData.filter(comment => comment.postId === post.id)
            };
        });

        print(enrichedData);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments'
];

fetchData(urls);
