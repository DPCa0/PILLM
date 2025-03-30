 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

 
const compose = (...functions) => (input) => 
    functions.reduceRight((acc, fn) => fn(acc), input);

 
const multiply = (a) => (b) => a * b;

 
const createReactiveObject = (obj) => {
    return new Proxy(obj, {
        set(target, property, value) {
            print(`Property ${property} set to ${value}`);
            target[property] = value;
            return true;
        }
    });
};

 

 
(async () => {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const data = await fetchData(url);
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();

 
const add5 = (x) => x + 5;
const double = (x) => x * 2;
const composedFunction = compose(double, add5);

print(composedFunction(10));   

 
const doubleNumber = multiply(2);
print(doubleNumber(5));  

 
const reactiveObject = createReactiveObject({ name: 'JavaScript' });
reactiveObject.name = 'ECMAScript';   
