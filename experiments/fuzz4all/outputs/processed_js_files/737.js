 

async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const { id, title, completed } = data;
        
        return processTask(id, title, completed);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function processTask(id, title, completed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (completed) {
                print(`Task ${id}: "${title}" is completed.`);
                resolve(`Task ${id} was successfully processed.`);
            } else {
                reject(new Error(`Task ${id} is not completed.`));
            }
        }, 1000);
    });
}

(async function main() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    try {
        const result = await fetchAndProcessData(url);
        print(result);
    } catch (error) {
        console.error('Processing error:', error);
    }
})();
