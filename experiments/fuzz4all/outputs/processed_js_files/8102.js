class NetworkRequest {
    #url;
    #cache = new Map();

    constructor(url) {
        this.#url = url;
    }

    async #fetchData(endpoint) {
        if (this.#cache.has(endpoint)) {
            print('Serving from cache');
            return this.#cache.get(endpoint);
        }

        print('Fetching from network');
        const response = await fetch(`${this.#url}${endpoint}`);
        const data = await response.json();
        this.#cache.set(endpoint, data);
        return data;
    }

    async getUserData(userId) {
        try {
            const userData = await this.#fetchData(`/users/${userId}`);
            print(`User Data for ${userId}:`, userData);
            return userData;
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const requestHandler = async () => {
    const networkRequest = new NetworkRequest('https://jsonplaceholder.typicode.com');

    print('Requesting data for user 1');
    await networkRequest.getUserData(1);

    print('Waiting for 2 seconds...');
    await delay(2000);

    print('Requesting data for user 1 again (should be cached)');
    await networkRequest.getUserData(1);

    print('Requesting data for user 2');
    await networkRequest.getUserData(2);
};

requestHandler();
