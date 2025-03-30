class Logger {
    #log = [];

    constructor(prefix = 'LOG') {
        this.prefix = prefix;
    }

    logMessage(message) {
        const timestamp = new Date().toISOString();
        this.#log.push(`${this.prefix} - ${timestamp}: ${message}`);
    }

    *logGenerator() {
        for (let entry of this.#log) {
            yield entry;
        }
    }

    [Symbol.iterator]() {
        return this.logGenerator();
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

const logger = new Logger('INFO');

fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
        logger.logMessage(`Fetched data: ${JSON.stringify(data)}`);
        for (let log of logger) {
            print(log);
        }
    })
    .catch(error => {
        logger.logMessage(`Error: ${error.message}`);
        for (let log of logger) {
            print(log);
        }
    });
