 
const sym = Symbol('unique');
const obj = {
    name: 'AdvancedJS',
    [sym]: 'hidden',
    [(() => 'dynamicProperty')()]: 42,
};

 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'name') {
            return `Intercepted: ${Reflect.get(...arguments)}`;
        }
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        if (prop === 'dynamicProperty') {
            print(`Changing dynamicProperty from ${target[prop]} to ${value}`);
        }
        return Reflect.set(...arguments);
    }
};

 
const proxiedObj = new Proxy(obj, handler);

 
async function fetchData() {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/users/1'];

    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    
    try {
        const results = await Promise.all(fetchPromises);
        results.forEach(result => print(result));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const iterator = numberGenerator();
for (const number of iterator) {
    print(`Generated number: ${number}`);
}

 
print(proxiedObj.name);
proxiedObj.dynamicProperty = 100;

 
fetchData();
