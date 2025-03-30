Certainly! Here's a JavaScript program that uses advanced features such as Promises, async/await, generators, and destructuring:

// Utility function to simulate asynchronous data fetching
const fetchData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`${url} data fetched`), Math.random() * 2000);
    });
};

// Async function to fetch multiple datasets concurrently
async function* fetchConcurrently(urls) {
    const fetchPromises = urls.map(fetchData);
    for (const promise of fetchPromises) {
        yield await promise;
    }
}

// Function to process data using destructuring and reduce
const processData = (results) => {
    return results.reduce((acc, { result }, index) => {
        acc[`result${index + 1}`] = result;
        return acc;
    }, {});
};

// Main function to execute the program
async function main() {
    const urls = ['http: 
    const dataGenerator = fetchConcurrently(urls);

    const results = [];
    for await (const data of dataGenerator) {
        const [domain] = data.split(' ');
        results.push({ result: `Processed: ${domain}` });
    }

    const finalResults = processData(results);
    print(finalResults);
}

main();

This program defines an asynchronous data fetching function and uses a generator function to fetch data concurrently. The `processData` function uses destructuring and reduces the fetched results into a structured object, which is then logged to the console.