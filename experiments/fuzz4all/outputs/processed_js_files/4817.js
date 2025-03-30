 
const fs = require('fs').promises;

 
(async function complexJavaScriptProgram() {
    try {
         
        const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
        const fetch = require('node-fetch');

        const results = await Promise.all(urls.map(async (url) => {
            const response = await fetch(url);
            return response.json();
        }));

         
        const [firstPost, secondPost] = results;
        print('Post Titles:', firstPost.title, secondPost.title);

         
        const combinedContent = `
            Title 1: ${firstPost?.title}
            Body 1: ${firstPost?.body}
            
            Title 2: ${secondPost?.title}
            Body 2: ${secondPost?.body}
        `;

         
        await fs.writeFile('posts.txt', combinedContent, 'utf-8');
        print('Post data has been written to posts.txt');

         
        const copiedPost = { ...firstPost };
        print('Copied Post:', copiedPost);

         
        function* idGenerator(start = 0) {
            let id = start;
            while (true) {
                yield id++;
            }
        }

        const gen = idGenerator();
        print('Generated IDs:', gen.next().value, gen.next().value, gen.next().value);

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
