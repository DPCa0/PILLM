 
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

 
const reactiveHandler = {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property ${property} does not exist.`);
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const user = new Proxy({ name: 'John', age: 30 }, reactiveHandler);

 
const taskSet = new Set();

function executeTask(taskName) {
    if (!taskSet.has(taskName)) {
        print(`Executing task: ${taskName}`);
        taskSet.add(taskName);
    } else {
        print(`Task ${taskName} has already been executed.`);
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
const cityPopulation = new Map([
    ['Tokyo', 37435191],
    ['Delhi', 29399141],
    ['Shanghai', 26317104]
]);

cityPopulation.forEach((pop, city) => {
    print(`${city} has a population of ${pop}`);
});

 
user.name = 'Alice';
print(user.name);

executeTask('Initialize');
executeTask('Initialize');  

const debouncedLog = debounce((msg) => print(msg), 300);
debouncedLog('Message 1');
debouncedLog('Message 2');  

fetchData('https://jsonplaceholder.typicode.com/posts/1');
