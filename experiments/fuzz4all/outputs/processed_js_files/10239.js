const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    const data = await response.json();
    return data;
};

const processData = ({ items }) => 
    items
    .filter(item => item.isActive)
    .map(({ name, value }) => ({ 
        displayName: name.toUpperCase(), 
        computedValue: value * 2 
    }));

const displayData = async (url) => {
    try {
        const rawData = await fetchData(url);
        const processedData = processData(rawData);
        
        const displayElement = document.getElementById('display');
        displayElement.innerHTML = processedData
            .map(({ displayName, computedValue }) => 
                `<div>${displayName}: ${computedValue}</div>`)
            .join('');
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

const DEBOUNCE_DELAY = 300;
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
};

document.getElementById('fetchButton').addEventListener('click', debounce(() => {
    displayData('https://api.example.com/data');
}, DEBOUNCE_DELAY));

- This program fetches data from a URL, processes it, and displays it.
- It uses `async/await` for asynchronous operations.
- Uses destructuring to handle objects.
- Demonstrates use of higher-order functions like `filter`, `map`.
- Implements a debounce function to limit frequent function invocations.