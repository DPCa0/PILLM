(async () => {
     
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const fetchUser = async (id) => {
        await delay(100 * id);  
        if (id % 2 === 0) {
            throw new Error(`Failed to fetch user ${id}`);
        }
        return { id, name: `User${id}` };
    };

    const usersIds = [1, 2, 3, 4, 5];
    const results = await Promise.allSettled(usersIds.map(fetchUser));

     
    const { default: lodash } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');

    const { fulfilled, rejected } = lodash.groupBy(results, 'status');

    print('Fulfilled Promises:');
    fulfilled.forEach(({ value }) => {
        print(`Fetched ${value.name}`);
    });

    print('Rejected Promises:');
    rejected.forEach(({ reason }) => {
        print(reason.message);
    });

     
    const target = { foo: 'bar', num: 42 };
    const handler = {
        get: (obj, prop) => {
            print(`Getting property ${prop}`);
            return prop in obj ? obj[prop] : 'default';
        },
        set: (obj, prop, value) => {
            print(`Setting property ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(target, handler);

    print(proxy.foo);     
    proxy.num = 7;              
    print(proxy.baz);     

     
    function* numberGenerator(limit) {
        for (let i = 0; i < limit; i++) {
            yield i;
        }
    }

    const gen = numberGenerator(5);
    for (let num of gen) {
        print(`Generated number: ${num}`);
    }
})();
