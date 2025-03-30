 
async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        if (typeof value === 'string' && value.trim() !== '') {
            print(`Setting property: ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
        console.warn(`Failed to set property: ${prop}`);
        return false;
    }
};

const person = { name: '', age: 30 };
const personProxy = new Proxy(person, handler);

 
function* processData(data) {
    yield data.map(post => post.title.toUpperCase());
    yield data.map(post => ({ ...post, length: post.body.length }));
    yield data.filter(post => post.id % 2 === 0);
}

 
(async () => {
    const data = await fetchData();
    const steps = processData(data);
    print('Uppercased Titles:', steps.next().value);
    print('Posts with Length:', steps.next().value);
    print('Filtered Posts (even IDs):', steps.next().value);

    personProxy.name = 'Alice';
    print('Person:', personProxy.name);
})();
