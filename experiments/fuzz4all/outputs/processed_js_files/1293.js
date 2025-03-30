 
const loggingHandler = {
    get(target, prop, receiver) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const person = new Proxy({ name: 'Alice', age: 25 }, loggingHandler);

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const dataPromise = fetchData('https://api.example.com/data');

 
person.name = 'Bob';
print(person.name);

 
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];

const [first, second, ...rest] = combinedArray;
print(first, second, rest);

 
const nestedArray = [[1], [2, 3], [4, [5, 6]]];
const flattenedArray = nestedArray.flatMap(x => x);
print(flattenedArray);

 
const uniqueKey = Symbol('unique');
const objectWithSymbol = {
    [uniqueKey]: 'value'
};
print(objectWithSymbol[uniqueKey]);
