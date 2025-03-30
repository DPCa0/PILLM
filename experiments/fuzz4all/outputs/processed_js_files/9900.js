(async () => {
     
    const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios@1.4.0/+esm');

     
    const handler = {
        get(target, prop, receiver) {
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            } else {
                console.warn(`Property ${prop} does not exist.`);
            }
        }
    };
    const user = new Proxy({ name: "Alice", age: 30 }, handler);

     
    function* idGenerator() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }

    async function* fetchData() {
        const ids = idGenerator();
        while (true) {
            const id = ids.next().value;
            try {
                const response = await axios.get(`https: 
                yield response.data;
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    }

     
    const generator = fetchData();
    const results = await Promise.allSettled([
        generator.next().then(({ value }) => console.log('Todo 1:', value)),
        generator.next().then(({ value }) => console.log('Todo 2:', value))
    ]);

     
    print(`User's Name: ${user.name ?? 'Unknown'}`);
    print(`User's Address: ${user.address?.street ?? 'No address available'}`);

     
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            print(`Promise ${index + 1} fulfilled.`);
        } else {
            print(`Promise ${index + 1} rejected:`, result.reason);
        }
    });
})();
