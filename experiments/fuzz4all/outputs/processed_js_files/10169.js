 

 
function* taskGenerator() {
    yield fetchData('https://api.github.com/users/octocat');
    yield fetchData('https://api.github.com/users/defunkt');
    yield fetchData('https://api.github.com/users/mojombo');
}

 
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

 
async function handleTasks(generator) {
    const iterator = generator();
    let result = iterator.next();
    while (!result.done) {
        try {
            const data = await result.value;
            print(`Fetched data:`, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        result = iterator.next();
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = { name: 'JavaScript', year: 1995 };
const proxy = new Proxy(targetObject, handler);

 
print(proxy.name);   
proxy.year = 2023;         

 
handleTasks(taskGenerator);
