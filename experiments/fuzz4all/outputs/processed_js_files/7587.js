 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = {
                '/user': { name: 'John Doe', age: 30 },
                '/posts': [{ id: 1, title: 'Hello World' }, { id: 2, title: 'Advanced JS' }]
            };
            resolve(mockData[url] || null);
        }, 1000);
    });
};

const dataHandler = {
    get: async (target, prop) => {
        if (prop in target.cache) {
            print(`Fetching ${prop} from cache`);
            return target.cache[prop];
        } else {
            print(`Fetching ${prop} from API`);
            const data = await fetchData(prop);
            if (data) {
                target.cache[prop] = data;
            }
            return data;
        }
    }
};

const dataProxy = new Proxy({ cache: {} }, dataHandler);

(async () => {
    try {
        const user = await dataProxy['/user'];
        print('User:', user);

        const posts = await dataProxy['/posts'];
        print('Posts:', posts);

         
        const cachedUser = await dataProxy['/user'];
        print('Cached User:', cachedUser);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
