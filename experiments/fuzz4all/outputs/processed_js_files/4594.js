 
const fibonacci = new Proxy((n, memo = {}) => {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}, {
    apply(target, thisArg, argumentsList) {
        print(`Calculating Fibonacci for n=${argumentsList[0]}`);
        return target(...argumentsList);
    }
});

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const manipulateArray = ([first, second, ...rest] = [], factor = 2) => {
    const doubled = rest.map(num => num * factor);
    return { first, second, doubled };
};

 
const privateData = new WeakMap();
const createPerson = (name, age) => {
    const id = Symbol('id');
    const person = { [id]: Symbol('private'), name, age };
    privateData.set(person, { id, getSecret: () => `Secret code for ${name}` });
    return person;
};

 
function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

const main = async () => {
    print(fibonacci(10));  

    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);  
    print(data);

    const arrInfo = manipulateArray([1, 2, 3, 4, 5]);  
    print(arrInfo);

    const person = createPerson('Alice', 30);  
    print(privateData.get(person).getSecret());

    for (let num of numberGenerator(5)) {  
        print(num);
    }
};

main();
