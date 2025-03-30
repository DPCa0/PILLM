 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const multiply = (a) => (b) => (c) => a * b * c;

 
const handler = {
    set(target, property, value) {
        print(`Property ${property} set to ${value}`);
        target[property] = value;
        return true;
    }
};
const reactiveObject = new Proxy({}, handler);

 
class Util {
    static reverseString(str) {
        return [...str].reverse().join('');
    }
}

 
const promiseChain = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello'), 1000);
}).then((value) => {
    print(value + ', World!');
    return 'JavaScript';
}).then((value) => {
    print('Learning', value);
    return value;
});

 
const [first, ...rest] = [1, 2, 3, 4];
const arr = [5, ...rest];
print('First:', first, 'Rest:', rest, 'Array:', arr);

 
(() => {
    print('This is an IIFE');
})();

 
fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => print('Fetched Data:', data));

print('Multiply:', multiply(2)(3)(4));  
reactiveObject.name = 'Reactive';
print('Reversed:', Util.reverseString('JavaScript'));
