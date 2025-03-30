 

 
function* fetchDataGenerator() {
    yield 'Fetching user data...';
    yield new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'Alice' }), 1000));
    yield 'Fetching posts...';
    yield new Promise(resolve => setTimeout(() => resolve(['Post 1', 'Post 2']), 1000));
    yield 'Fetching complete';
}

 
async function fetchData() {
    const iterator = fetchDataGenerator();

    let result = iterator.next();
    while (!result.done) {
        if (result.value instanceof Promise) {
            try {
                const data = await result.value;
                print('Data:', data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            print(result.value);
        }
        result = iterator.next();
    }
}

 
const targetObject = { id: 1, name: 'Alice' };
const handler = {
    get(target, property) {
        print(`Getting ${property}: ${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxy = new Proxy(targetObject, handler);

 
proxy.name;            
proxy.name = 'Bob';    

 
fetchData();
