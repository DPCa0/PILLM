 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 30, country: 'Wonderland' }), 1000);
});

 
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

 
const processData = async () => {
    try {
        const { name, age, country } = await fetchData();
        print(`Name: ${name}, Age: ${age}, Country: ${country}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const debouncedProcess = debounce(processData, 500);

 
debouncedProcess();
debouncedProcess();
debouncedProcess();
