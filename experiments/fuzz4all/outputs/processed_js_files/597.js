class AsyncOperation {
    constructor(delay) {
        this.delay = delay;
    }

    async performOperation() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Operation completed after ${this.delay}ms`);
            }, this.delay);
        });
    }
}

const fetchWithTimeout = (url, timeout) => {
    const controller = new AbortController();
    const signal = controller.signal;

    return Promise.race([
        fetch(url, { signal }).then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }),
        new Promise((_, reject) =>
            setTimeout(() => {
                controller.abort();
                reject(new Error('Fetch timed out'));
            }, timeout)
        )
    ]);
};

(async () => {
     
    const [operation1, operation2, operation3] = await Promise.all([
        new AsyncOperation(1000).performOperation(),
        new AsyncOperation(2000).performOperation(),
        new AsyncOperation(1500).performOperation(),
    ]);

    print(operation1, operation2, operation3);

     
    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 3000);
        const { title, ...rest } = data;
        print(`Title: ${title}`, rest);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

     
    const userMap = new Map([
        [1, 'Alice'],
        [2, 'Bob'],
        [3, 'Carol']
    ]);

    const nameSet = new Set(['Alice', 'Bob', 'Dave']);

    for (const [id, name] of userMap) {
        if (nameSet.has(name)) {
            print(`User found: ID ${id}, Name ${name}`);
        }
    }

     
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    for (const num of generateSequence(1, 5)) {
        print(`Generated number: ${num}`);
    }
})();
