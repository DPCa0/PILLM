Certainly! Here's a complex JavaScript program that demonstrates advanced features like Promises, async/await, generators, and destructuring:

 
const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { result: "Data from " + url };
        Math.random() > 0.2 ? resolve(data) : reject(new Error("Failed to fetch"));
    }, 1000);
});

 
function* dataFetcher(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
async function fetchAllData(urls) {
    const generator = dataFetcher(urls);
    const results = [];

    for (const promise of generator) {
        try {
            const { result } = await promise;  
            results.push(result);
        } catch (error) {
            console.error(error);
        }
    }

    return results;
}

 
const urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3"
];

 
(async () => {
    const results = await fetchAllData(urls);
    print("Fetched Results:", results);
})();

This script uses a combination of modern JavaScript features:
- Promises are used to simulate asynchronous data fetching with a 20% chance of failure.
- A generator function `dataFetcher` yields Promises for each URL.
- `async/await` is used in `fetchAllData` to handle asynchronous operations elegantly.
- Destructuring is used to extract values from objects returned by the promises.