 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

 
const user = {
    name: 'Alice',
    age: 25
};

const handler = {
    get: (target, property) => {
        print(`Getting ${property} from user`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value} in user`);
        target[property] = value;
        return true;
    }
};

const proxyUser = new Proxy(user, handler);

 
const app = (() => {
    const privateVar = 'I am private';
    
    function privateMethod() {
        print(privateVar);
    }
    
    return {
        publicMethod: () => {
            print('I am public');
            privateMethod();
        }
    };
})();

 
(async () => {
    const jsonPlaceholderURL = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(jsonPlaceholderURL);
    print('Fetched data:', data);

    print('Generated ID:', gen.next().value);
    print('Generated ID:', gen.next().value);

    print('User Name:', proxyUser.name);
    proxyUser.age = 26;

    app.publicMethod();
})();
