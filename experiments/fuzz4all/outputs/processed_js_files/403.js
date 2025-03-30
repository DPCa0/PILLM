 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(endpoint) {
    await delay(1000);  
    const data = {
        '/user': { id: 1, name: 'John Doe' },
        '/posts': [
            { id: 101, title: 'Advanced JavaScript' },
            { id: 102, title: 'Async/Await in Depth' }
        ]
    };
    return data[endpoint];
}

 
function processData(transformation) {
    return async function(endpoint) {
        const data = await fetchData(endpoint);
        return transformation(data);
    };
}

 
const getUserName = user => user.name;
const getPostTitles = posts => posts.map(post => post.title);

 
(async function() {
    try {
        const getUserNameFromData = processData(getUserName);
        const getPostTitlesFromData = processData(getPostTitles);

        const [userName, postTitles] = await Promise.all([
            getUserNameFromData('/user'),
            getPostTitlesFromData('/posts')
        ]);

        print(`User: ${userName}`);
        print(`Post Titles: ${postTitles.join(', ')}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
