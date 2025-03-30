 

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const data = {
    value: 42
};

const proxyData = new Proxy(data, handler);

 
async function* fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const response = await fetch(url);
    const todos = await response.json();

    for (const todo of todos) {
        yield todo;
    }
}

 
async function processTodos() {
    try {
        let count = 0;
        for await (const todo of fetchData()) {
            proxyData.value = todo.id;
            print(`Todo ${++count}: ${todo.title}`);
            if (count >= 5) break;  
        }
    } catch (err) {
        console.error('Error processing todos:', err);
    }
}

 
(async function main() {
    print('Processing todos...');
    await processTodos();
    print('Finished processing todos.');
})();
