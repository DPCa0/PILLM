 
const UNIQUE_ID = Symbol('id');

 
const accessLogger = {
    get(target, property, receiver) {
        print(`Property '${String(property)}' accessed.`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Property '${String(property)}' set to '${value}'.`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
async function fetchDataAndLog(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
const baseURL = 'https://jsonplaceholder.typicode.com';
const endpoint = 'posts';
const completeURL = `${baseURL}/${endpoint}/1`;

 
class Post {
    #title;
    constructor(title, content) {
        this.#title = title;
        this.content = content;
        this[UNIQUE_ID] = Math.random().toString(36).substr(2, 9);
    }
    getTitle() {
        return this.#title;
    }
}

 
const post = new Post('Hello World', 'This is the content of the post.');
const proxiedPost = new Proxy(post, accessLogger);

 
print(proxiedPost.getTitle());
proxiedPost.content = 'Updated content';

 
fetchDataAndLog(completeURL);
