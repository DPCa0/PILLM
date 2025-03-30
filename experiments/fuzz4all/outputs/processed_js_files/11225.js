 

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    return response.json();
};

 
async function* numberGenerator(limit) {
    for (let i = 1; i <= limit; i++) {
        yield new Promise((resolve) => setTimeout(() => resolve(i), 100));
    }
}

 
const processNumbers = async (limit) => {
    const results = [];
    for await (let number of numberGenerator(limit)) {
        const squared = number ** 2;
        results.push(squared);
        print(`Number: ${number}, Squared: ${squared}`);
    }
    return results;
};

 
(async () => {
    try {
        const dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';
        const data = await fetchData(dataUrl);
        const { id, title } = data;

        print(`Fetched Data - ID: ${id}, Title: "${title}"`);
        
        print("Processing numbers...");
        const processedNumbers = await processNumbers(5);
        print(`Processed Numbers: ${processedNumbers.join(', ')}`);
    } catch (error) {
        console.error(error);
    }
})();
