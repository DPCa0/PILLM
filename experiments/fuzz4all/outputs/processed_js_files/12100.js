 
const calculateAverage = (...numbers) => {
    if (numbers.length === 0) return 0;
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' has been accessed.`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Property '${prop}' set to '${value}'.`);
        obj[prop] = value;
        return true;
    }
};

const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
const htmlTemplate = (strings, ...values) => {
    return strings.raw.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
};

const name = "Bob";
const greeting = htmlTemplate`<div>Hello, <strong>${name}</strong>!</div>`;
print(greeting);

 
class MathUtils {
    static pi = 3.14159;

    static circleArea(radius) {
        return this.pi * radius * radius;
    }
}

print(`Area of circle with radius 3: ${MathUtils.circleArea(3)}`);

 
(() => {
    const [a, b = 5] = [10];
    print(`Values are: a = ${a}, b = ${b}`);
})();

 
(async () => {
    print("Average:", calculateAverage(2, 4, 6, 8, 10));
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    if (data) {
        print("Fetched Data:", data);
    }
    user.name = 'Bob';
    console.log(user.name