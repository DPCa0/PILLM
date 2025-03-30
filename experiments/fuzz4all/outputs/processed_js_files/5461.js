 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const user = { firstName: 'John', lastName: 'Doe' };
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxyUser = new Proxy(user, handler);
proxyUser.firstName;  
proxyUser.lastName = 'Smith';  

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
fetchData('https://api.github.com/users/octocat');

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const set = new Set([1, 2, 3, 4, 5]);

print([...map.entries()]);  
print([...set.values()]);  

 
function tag(strings, ...expressions) {
    return strings.reduce((accumulator, str, i) => `${accumulator}${str}<${expressions[i] || ''}>`, '');
}

const name = "Alice";
const city = "Wonderland";

print(tag`Hello, ${name} from ${city}`);  

 