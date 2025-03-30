 

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function fetchData(apiEndpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(`Data from ${apiEndpoint}`);
            } else {
                reject('Failed to fetch data');
            }
        }, 1000);
    });
}

 
const logHandler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
    }
};

 
const config = new Proxy({ apiEndpoint: 'https://api.example.com', limit: 5 }, logHandler);

 
async function main() {
    try {
        const data = await fetchData(config.apiEndpoint);
        print(data);

        const fibGen = fibonacci(config.limit);
        for (let num of fibGen) {
            print(num);
        }
    } catch (error) {
        console.error(error);
    }
}

 
main();
