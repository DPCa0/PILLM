 
function* fibonacci(n) {
    let a = 0, b = 1, count = 0;
    while (count < n) {
        yield a;
        [a, b] = [b, a + b];
        count++;
    }
}

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    print('Fibonacci Sequence:');
    for (let num of fibonacci(10)) {
        print(num);
    }

    await fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();

 
const user = {
    name: 'Alice',
    age: 30
};

const userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        print(`Getting ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
});

print(userProxy.name);  
userProxy.age = 31;  

 
const mapExample = new Map();
mapExample.set('key1', 'value1').set('key2', 'value2');
print('Map Entries:');
for (const [key, value] of mapExample.entries()) {
    print(`${key}: ${value}`);
}

const setExample = new Set([1, 2, 3, 3, 4]);
print('Unique Set Values:', [...setExample]);
