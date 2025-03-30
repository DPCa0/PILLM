 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

 
const loggerProxy = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            if (prop in target) {
                print(`Property '${prop}' accessed, value: ${target[prop]}`);
                return target[prop];
            }
            print(`Property '${prop}' does not exist`);
        },
        set(target, prop, value) {
            print(`Setting property '${prop}' to value: ${value}`);
            target[prop] = value;
            return true;
        }
    });
};

 
async function* asyncDataGenerator(url) {
    const data = await fetchData(url);
    for (const item of data) {
        yield item;
    }
}

 
const PrivateData = (() => {
    const privateStore = new WeakMap();

    class PrivateDataClass {
        constructor() {
            privateStore.set(this, {});
        }

        setPrivate(key, value) {
            const store = privateStore.get(this);
            store[key] = value;
        }

        getPrivate(key) {
            return privateStore.get(this)[key];
        }
    }

    return PrivateDataClass;
})();

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const loggedObject = loggerProxy({ id: 1, title: "Sample Post" });
    print(loggedObject.title);
    loggedObject.title = "Updated Post";
    
     
    const generator = asyncDataGenerator(url);
    for await (const item of generator) {
        print(item.title);
        break;  
    }

     
    const privateInstance = new PrivateData();
    privateInstance.setPrivate('secret', 'This is private');
    print(privateInstance.getPrivate('secret'));
})();
