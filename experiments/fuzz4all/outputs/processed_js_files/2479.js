 
async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
const logHandler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
function flattenArray(arr, depth = 1) {
    return arr.reduce((acc, val) => Array.isArray(val) && depth > 1
        ? acc.concat(flattenArray(val, depth - 1))
        : acc.concat(val), []);
}

 
class Example {
    #privateField = 'Private Data';

    #privateMethod() {
        print('This is a private method');
    }

    publicMethod() {
        print('This is a public method');
        print(this.#privateField);
        this.#privateMethod();
    }
}

 
function tag(strings, ...values) {
    print(strings);
    print(values);
}

const name = 'John';
const age = 30;
tag`Hello ${name}, you are ${age} years old.`;

 
(async function main() {
     
    const data = await fetchData();
    print('Fetched data:', data);

     
    const proxyObj = new Proxy({ a: 1, b: 2 }, logHandler);
    proxyObj.a = 42;
    print(proxyObj.b);

     
    const nestedArray = [1, [2, [3, [4]]]];
    print('Flattened array:', flattenArray(nestedArray, Infinity));

     
    const example = new Example();
    example.publicMethod();
})();
