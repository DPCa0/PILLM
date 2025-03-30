const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        const items = ['Hello', 'from', 'an', 'async', 'generator!'];
        for (const item of items) {
            await new Promise(resolve => setTimeout(resolve, 500));  
            yield item;
        }
    }
};

(async () => {
    const fetchedData = fetch('https://jsonplaceholder.typicode.com/posts/1').then(response => response.json());

     
    const [asyncItems, apiData] = await Promise.all([
        (async () => {
            let result = '';
            for await (const item of asyncIterable) {
                result += `${item} `;
            }
            return result.trim();
        })(),
        fetchedData
    ]);

    print(asyncItems);
    print('Fetched API data:', apiData);
})();

 
const target = { language: 'JavaScript', level: 'Advanced' };
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);
print(proxy.language);
proxy.framework = 'React';
print(proxy.framework);
