 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* asyncGenerator() {
    print("Generator started");
    yield delay(1000).then(() => print("Async operation 1 complete"));
    yield delay(1000).then(() => print("Async operation 2 complete"));
    yield delay(1000).then(() => print("Async operation 3 complete"));
    print("Generator ending");
}

 
async function runGenerator(gen) {
    const iterator = gen();
    for (const promise of iterator) {
        await promise;   
    }
}

 
const config = {
    endpoint: "https://api.example.com/data",
    timeout: 5000,
    retries: 3
};

const { endpoint, timeout, retries } = config;
print(`Config: Endpoint=${endpoint}, Timeout=${timeout}, Retries=${retries}`);

 
(async function complexFeatureDemo() {
    print("Starting complex feature demo");

    try {
        await runGenerator(asyncGenerator);
        
        const fetchData = async (url) => {
            print(`Fetching data from ${url} with timeout ${timeout}ms`);
            await delay(timeout);   
            return { data: "Sample Data" };
        };

         
        let attempt = 0;
        let data;
        while (attempt < retries) {
            try {
                const response = await fetchData(endpoint);
                data = response.data;
                break;
            } catch (error) {
                console.error("Error fetching data, retrying...");
                attempt++;
            }
        }

        if (!data) throw new Error("Failed to fetch data after retries");

        print(`Fetched data: ${data}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }

    print("Complex feature demo completed");
})();
