 

const dataHandler = {
    fetchData: async function(url) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
};

const dataProxy = new Proxy(dataHandler, {
    get: function(target, property, receiver) {
        if (property === 'fetchData') {
            return async function(...args) {
                print('Fetching data...');
                let result = await Reflect.get(target, property, receiver).apply(target, args);
                print('Data fetched:', result);
                return result;
            };
        }
        return Reflect.get(target, property, receiver);
    }
});

function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

(async function() {
    const data = await dataProxy.fetchData('https://jsonplaceholder.typicode.com/posts');
    if (data) {
        const gen = dataGenerator(data);
        for (const post of gen) {
            print(`Post ID: ${post.id}, Title: ${post.title}`);
        }
    }
})();
