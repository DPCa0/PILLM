 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const handler = {
    get(target, property) {
        print(`Getting value of ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting value of ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const person = new Proxy({name: 'Alice', age: 30}, handler);

 
function* transform(array) {
    for (let item of array) {
        yield { transformedValue: item * 2 };
    }
}

 
async function main() {
    person.name = 'Bob';  
    print(person.name);  

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print(data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }

    const numbers = [1, 2, 3, 4];
    const transformedNumbers = transform(numbers);

    for (let value of transformedNumbers) {
        print(value);
    }
}

main();
