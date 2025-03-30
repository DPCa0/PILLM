 
async function* fetchJSON(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Accessing ${property}`);
        return Reflect.get(target, property, receiver);
    }
};

const targetObject = {
    name: 'Advanced JavaScript',
    type: 'Demo Program'
};

const proxiedObject = new Proxy(targetObject, handler);

 
const uniqueSym = Symbol('unique');

class AdvancedFeatureDemo {
    constructor(name) {
        this.name = name;
        this[uniqueSym] = 'Secret Symbol Value';
    }

     
    static description = 'An advanced JavaScript demonstration';

     
    #privateField = 'Private Value';

    getPrivateField() {
        return this.#privateField;
    }

    static [Symbol.hasInstance](instance) {
        return instance instanceof AdvancedFeatureDemo && instance.name !== undefined;
    }
}

(async () => {
     
    print(proxiedObject.name);
    
     
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];
    for await (const json of fetchJSON(urls)) {
        print(json);
    }

     
    const demo = new AdvancedFeatureDemo('Demo Instance');
    print(demo instanceof AdvancedFeatureDemo);  
    print(AdvancedFeatureDemo.description);
    print(demo.getPrivateField());
    print(demo[uniqueSym]);  

     
    if (Math.random() > 0.5) {
        const { version } = await import('./module.js');
        print(`Module version: ${version}`);
    } else {
        print('Skipped dynamic import');
    }
})();
