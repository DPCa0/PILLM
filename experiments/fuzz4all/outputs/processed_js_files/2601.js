 

 
const fetchData = (delay) => new Promise((resolve) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), delay);
});

 
function* processNumbers(numbers) {
    for (let number of numbers) {
        yield number * 2;
    }
}

 
async function execute() {
    try {
        print('Fetching data...');
        const { data } = await fetchData(1000);

        print('Processing data...');
        const processedNumbers = processNumbers(data);

         
        const results = [...processedNumbers];
        print('Processed Results:', results);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
(async () => {
    await execute();
})();
