class ApiManager {
    constructor() {
        this.cache = new Map();
    }

    async fetchData(url) {
        if (this.cache.has(url)) {
            print('Fetching from cache');
            return this.cache.get(url);
        }

        print('Fetching from API');
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        this.cache.set(url, data);
        return data;
    }
}

function* createUniqueIDGenerator() {
    let id = 0;
    while (true) {
        yield `id-${id++}`;
    }
}

async function main() {
    const apiManager = new ApiManager();
    const idGenerator = createUniqueIDGenerator();

    try {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        const todo = await apiManager.fetchData(url);

        const uniqueID = idGenerator.next().value;
        const enhancedTodo = {
            ...todo,
            uniqueID,
            completed: todo.completed ? 'Yes' : 'No',
            timestamp: new Date().toISOString()
        };

        print(enhancedTodo);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
