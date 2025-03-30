const { fromEvent } = require('rxjs');
const { map, debounceTime, distinctUntilChanged, switchMap } = require('rxjs/operators');
const fetch = require('node-fetch');

 
const fetchData = async (query) => {
    print(`Fetching data for query: ${query}`);
    const response = await fetch(`https: 
    return response.json();
};

 
async function search(query) {
    try {
        const results = await fetchData(query);
        print(`Results:`, results.slice(0, 2));   
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const inputElement = { value: '', addEventListener: function(event, handler) {
    setInterval(() => {
        this.value = Math.floor(Math.random() * 10);   
        handler({ target: this });
    }, 1000);
} };

const input$ = fromEvent(inputElement, 'input').pipe(
    map(event => event.target.value),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => search(query))
);

input$.subscribe();
