 
class Api {
    constructor() {
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    async fetchData(endpoint) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        return response.json();
    }
}

const api = new Api();

 
const apiProxy = new Proxy(api, {
    get: (target, prop) => {
        if (typeof target[prop] === 'function') {
            return async function (...args) {
                print(`Calling API method: ${prop} with arguments: ${JSON.stringify(args)}`);
                const result = await target[prop].apply(this, args);
                print(`Result from ${prop}:`, result);
                return result;
            };
        }
        return target[prop];
    }
});

 
async function getData() {
    try {
        const [users, posts] = await Promise.all([
            apiProxy.fetchData('users'),
            apiProxy.fetchData('posts')
        ]);

        const mappedData = users.map(user => {
            const { id, name, email } = user;
            const userPosts = posts.filter(post => post.userId === id);
            return { id, name, email, posts: userPosts };
        });

        print('Mapped Data:', mappedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();
