 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
     
    const map = new Map([
        ['name', 'Alice'],
        ['age', 30],
        ['profession', 'Developer']
    ]);

    const set = new Set([1, 2, 3, 4, 5]);

    const getUserInfo = async () => {
         
        const [user, numbers] = await Promise.all([
            delay(1000).then(() => [...map.entries()]),
            delay(500).then(() => [...set])
        ]);

        return { user, numbers };
    };

     
    for await (const [key, value] of map) {
        print(`Key: ${key}, Value: ${value}`);
    }

     
    const result = (await getUserInfo())?.user ?? [];
    print('User Info:', Object.fromEntries(result));

     
    const reactiveHandler = {
        get(target, property) {
            print(`Getting value of ${property}`);
            return property in target ? target[property] : 'Property not found';
        },
        set(target, property, value) {
            print(`Setting value of ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const reactiveObject = new Proxy({}, reactiveHandler);
    reactiveObject.name = 'Bob';
    print(reactiveObject.name);
    print(reactiveObject.age);
})();
