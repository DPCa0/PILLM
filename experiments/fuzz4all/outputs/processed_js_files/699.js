class Task {
    #name;
    #completed;

    constructor(name) {
        this.#name = name;
        this.#completed = false;
    }

    complete() {
        this.#completed = true;
    }

    get status() {
        return `${this.#name}: ${this.#completed ? 'Completed' : 'Pending'}`;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
}

(async () => {
    const task = new Task('Learn JavaScript ES6+');
    print(task.status);
    task.complete();
    print(task.status);

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print('Fetched Task:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
