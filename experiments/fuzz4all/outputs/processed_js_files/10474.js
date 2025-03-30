 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    const fetchSimulatedData = () => delay(2000).then(() => 'Data from server');
    const timeoutPromise = delay(1500).then(() => Promise.reject(new Error('Request timed out')));
    
    try {
        const result = await Promise.race([fetchSimulatedData(), timeoutPromise]);
        print(result);
    } catch (error) {
        console.error(error.message);
    }
}

 
function processNumbers(first, ...numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, first);
    print(`Sum: ${sum}`);

    const [min, max] = [Math.min(first, ...numbers), Math.max(first, ...numbers)];
    print(`Min: ${min}, Max: ${max}`);
}

 
(async () => {
    const user = { name: 'John Doe', age: 30 };
    const { name, age } = user;

    print(`User: ${name}, Age: ${age}`);
    
    await fetchData();
    processNumbers(5, 10, 15, 20);
})();
