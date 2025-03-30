 

 
async function* asyncFibonacci(max) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < max; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const multiply = x => y => x * y;

 
const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};

const personProxy = new Proxy(person, {
    get: (target, property) => {
        print(`Accessing property '${property}'`);
        return target[property];
    }
});

 
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
];

Promise.all(urls.map(url =>
    fetch(url).then(response => response.json())
)).then(results => {
    print("Fetched Data:", results);
});

 
(async () => {
    const { firstName, ...rest } = personProxy;
    print(`First name is ${firstName}`);
    print('Rest of the properties:', rest);

    const double = multiply(2);
    print('Double of 5:', double(5));

    print('Generating Fibonacci sequence...');
    for await (const num of asyncFibonacci(5)) {
        print(num);
    }
})();
