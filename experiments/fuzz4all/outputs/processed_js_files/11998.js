 
(async () => {
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');

     
    const handler = {
        get: function(target, prop) {
            if (prop === 'secret') {
                return 'Access Denied';
            }
            return Reflect.get(...arguments);
        }
    };

    const user = {
        name: "Alice",
        age: 25,
        secret: "My Secret"
    };

    const proxiedUser = new Proxy(user, handler);

    print(proxiedUser.name);   
    print(proxiedUser.secret);  

     
    const clonedUser = _.cloneDeep(proxiedUser);
    print(clonedUser);

     
    async function* asyncGenerator() {
        let i = 0;
        while (i < 3) {
            yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
        }
    }

    for await (let num of asyncGenerator()) {
        print(num);
    }
})();
