 
function createObservableObject(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Getting property '${prop}'`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            print(`Setting property '${prop}' to '${value}'`);
            return Reflect.set(target, prop, value);
        }
    });
}

 
async function fetchDataAndProcess(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        let data = await response.json();
        return processFetchedData(data);
    } catch (error) {
        console.error('Fetching or processing failed:', error);
    }
}

 
let person = createObservableObject({
    name: 'John Doe',
    age: 30
});

 
person.name = 'Jane Doe';
print(person.age);

 
function safeHTML(strings, ...values) {
    return strings.reduce((acc, str, i) => {
        let val = values[i - 1];
        if (typeof val === 'string') {
            val = val.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return acc + val + str;
    });
}

const userInput = "<script>alert('XSS!')</script>";
print(safeHTML`<div>User Input: ${userInput}</div>`);

 
(() => {
    print('IIFE executed!');
})();

 
const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
for (const [key, value] of map) {
    print(`${key}: ${value}`);
}
const arr = [1, 2, 3, 4];
const [first, ...rest] = arr;
print(`First: ${first}, Rest: ${rest}`);

 
class Animal {
    static [Symbol.hasInstance](instance) {
        return instance.species