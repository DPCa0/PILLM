 

 
 
export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

 
 
import { fetchData } from './fetchModule.js';

(async () => {
    try {
         
        const { title, body } = await fetchData('https://jsonplaceholder.typicode.com/posts/1');

         
        print(`Title: ${title}\nContent: ${body}`);

         
        const target = { title, body };
        const handler = {
            get: (obj, prop) => {
                print(`Accessing ${prop} value: ${obj[prop]}`);
                return obj[prop];
            }
        };

        const proxy = new Proxy(target, handler);

         
        print(`Access via Proxy -> Title: ${proxy.title}, Body: ${proxy.body}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
