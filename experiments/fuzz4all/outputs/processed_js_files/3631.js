 

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

const processData = async (url) => {
    try {
        const { data } = await fetchData(url);
        
        const uniqueItems = new Set(data.map(item => item.id));
        const result = new Map();

        uniqueItems.forEach(id => {
            const itemDetails = data.find(item => item.id === id);
            result.set(id, itemDetails);
        });

        return result;
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

const url = 'https://jsonplaceholder.typicode.com/posts';
processData(url).then(result => {
    const handler = {
        get: (target, prop) => {
            if (prop === 'allIds') {
                return Array.from(target.keys());
            }
            return target.get(prop);
        },
        set: (target, prop, value) => {
            target.set(prop, value);
            print(`New item added with ID: ${prop}`);
            return true;
        }
    };

    const proxyResult = new Proxy(result, handler);

    print('All IDs:', proxyResult.allIds);
    proxyResult.set(101, { id: 101, title: 'New Post' });
    print('Item with ID 101:', proxyResult.get(101));
});
