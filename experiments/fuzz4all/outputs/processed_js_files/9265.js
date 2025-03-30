 

 
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

 
async function fetchAndProcessData(url) {
    try {
         
        const response = await fetch(url);
         
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
         
        const data = await response.json();
        
         
        const userOnePosts = data
            .filter(({ userId }) => userId === 1)
            .map(({ id, title }) => ({ id, title }));

         
        const output = userOnePosts.map(({ id, title }) => `Post ID: ${id}, Title: "${title}"`).join('\n');

        print(output);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
(async () => {
    await fetchAndProcessData(API_URL);
})();
