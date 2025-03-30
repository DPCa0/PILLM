 
async function* fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const dataGen = fetchData(url);

    for await (let data of dataGen) {
         
        const dataProxy = new Proxy(data, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                } else {
                    console.warn(`Property ${prop} doesn't exist`);
                    return 'N/A';
                }
            }
        });

        // Using destructuring and rest operator
        const { userId, id, ...rest } = dataProxy;

        // Using template literals and tagged templates
        const tag = (strings, ...values) => strings.map((s, i) => `${s}${values[i] || ''}`).join('');
        print(tag`User ID: ${userId}, Post ID: ${id}`);
        print('Post Data:', rest);
    }
})();
