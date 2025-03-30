 
import { readFile } from 'fs/promises';

 
async function fetchAndProcessData() {
    try {
         
        const { default: axios } = await import('axios');

         
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;

         
        const titles = posts
            .filter(({ userId }) => userId % 2 === 0)
            .map(({ id, title }) => ({ id, title: title.toUpperCase() }));

        print('Filtered Titles:', titles);

         
        function format(strings, ...values) {
            return strings.reduce((result, str, i) => `${result}${str}<${values[i] || ''}>`, '');
        }

        print(format`Post Titles Processed: ${titles.length}`);

         
        const fileReadPromises = titles.map(({ id }) =>
            readFile(`post_${id}.txt`, 'utf-8').catch(() => `File for post ${id} not found`)
        );

        const fileResults = await Promise.allSettled(fileReadPromises);

        fileResults.forEach(({ status, value, reason }, index) => {
            if (status === 'fulfilled') {
                print(`Content of post_${titles[index].id}:`, value);
            } else {
                console.warn(`Error reading post_${titles[index].id}:`, reason);
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
class DataCache {
    #cache = new WeakMap();

    addToCache(key, value) {
        this.#cache.set(key, value);
    }

    getFromCache(key) {
        return this.#cache.get(key);
    }
}

 
const cache = new DataCache();
cache.addToCache(fetchAndProcessData, { timestamp: Date.now() });
print('Cache Data:', cache.getFromCache(fetchAndProcessData));

 
fetchAndProcessData();
