class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function* dataStream(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

async function processData(url) {
    try {
        const data = await fetchData(url);
        const generator = dataStream(data);
        
        for (const item of generator) {
            print(`Processing item: ${JSON.stringify(item)}`);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

const deferred = new Deferred();
const button = document.createElement('button');
button.innerText = 'Fetch Data';
document.body.appendChild(button);

button.addEventListener('click', debounce(() => {
    deferred.promise
        .then(url => processData(url))
        .catch(err => console.error('Failed to fetch data:', err));
}, 300));

deferred.resolve('https://jsonplaceholder.typicode.com/todos');
