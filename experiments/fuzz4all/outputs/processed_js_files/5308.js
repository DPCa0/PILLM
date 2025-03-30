 

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetchData(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    }
}

const apiProxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Property ${prop} does not exist on target.`);
        }
    }
};

const apiClient = new Proxy(new ApiClient('https://jsonplaceholder.typicode.com'), apiProxyHandler);

(async () => {
    try {
         
        const userData = await apiClient.fetchData('/users/1');
        const { name, email, ...otherDetails } = userData;

        print(`Name: ${name}`);
        print(`Email: ${email}`);
        print('Other Details:', otherDetails);

         
        const postsData = await apiClient.fetchData('/posts?userId=1');
        const [firstPost, ...remainingPosts] = postsData;

        print('First Post:', firstPost);
        print(`Total Remaining Posts: ${remainingPosts.length}`);
    } catch (error) {
        console.error(error.message);
    }
})();
