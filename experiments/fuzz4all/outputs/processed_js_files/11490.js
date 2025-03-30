 

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchData(urls) {
    try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    set: function(target, property, value) {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    }
};

const reactivePerson = new Proxy({}, handler);

 
const user = {
    name: "Alice",
    age: 30,
    city: "Wonderland"
};

const { name, ...rest } = user;
print(name);  
print(rest);  

 
const sym = Symbol('desc');
const map = new Map();
map.set(sym, 'value associated with a symbol');

 
(async () => {
    print('Fibonacci Sequence:');
    for (const num of fibonacci(5)) {
        print(num);
    }

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const result = await fetchData(urls);
    print(result);

    reactivePerson.name = 'Bob';
    reactivePerson.age = 28;

    print(map.get(sym));
})();
