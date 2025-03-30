 
const calculateSum = (multiplier = 1, ...numbers) => {
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum * multiplier;
};

 
const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, {
    get: (obj, prop) => {
        print(`Property '${prop}' was accessed.`);
        return prop in obj ? obj[prop] : 42;  
    }
});

 
const asyncOperation = async () => {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => resolve("Operation successful!"), 1000);
        });
        print(result);
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

 
const map = new Map();
const objKey = {};
map.set(objKey, "Value associated with object key");

 
class ExampleClass {
    #privateField = "I'm private!";
    
    displayPrivateField() {
        print(this.#privateField);
    }
}

 
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => `${result}${str}<${values[i] || ''}>`, '');
}

const exampleInstance = new ExampleClass();
exampleInstance.displayPrivateField();
print(tag`Hello, ${"world"}! This is a tagged template.`);

 
const nestedArray = [1, 2, [3, 4], [5, 6]];
const flatMappedArray = nestedArray.flatMap(num => (Array.isArray(num) ? num : [num, num]));
print(flatMappedArray);

 
print(proxy.a);
print(proxy.c);  

 
asyncOperation();

 
print(calculateSum(2, 1, 2, 3, 4));  
