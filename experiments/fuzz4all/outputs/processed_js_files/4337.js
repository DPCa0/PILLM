 
import fs from 'fs';
import { promisify } from 'util';
import fetch from 'node-fetch';

 
const readFileAsync = promisify(fs.readFile);

 
const config = new Proxy({
    apiEndpoint: 'https://jsonplaceholder.typicode.com/posts',
    maxRetries: 3
}, {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    }
});

 
(async () => {
    try {
         
        const { apiEndpoint, maxRetries = 5 } = config;

         
        print(`Fetching data from ${apiEndpoint} with max ${maxRetries} retries`);

         
        const response = await fetch(apiEndpoint);
        const data = await response.json();

         
        const titles = data.map(({ title }) => title);
        print('Post Titles:', titles);

         
        const highlight = (strings, ...values) => {
            return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `<em>${values[i]}</em>` : ''}`, '');
        };

        print(highlight`Fetched ${data.length} posts successfully.`);

         
        const firstPost = data[0]?.body ?? 'No posts available';
        print('First Post:', firstPost);

         
        const fileData = await readFileAsync('./someFile.txt', 'utf8');
        print('File Content:', fileData);

    } catch (error) {
        console.error('Error:', error);
    }
})();
