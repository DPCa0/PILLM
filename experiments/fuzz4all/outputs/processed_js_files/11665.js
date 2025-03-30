 

function* range(start, end, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

function fetchData(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve(`Data for number ${num}`);
            } else {
                reject(`Error fetching data for number ${num}`);
            }
        }, Math.random() * 1000);
    });
}

async function processData() {
    const results = [];
    for (const number of range(1, 5)) {
        try {
            const data = await fetchData(number);
            print(`Success: ${data}`);
            results.push(data);
        } catch (error) {
            console.error(`Failure: ${error}`);
        }
    }
    return results;
}

(async () => {
    const finalData = await processData();
    const [first, second, ...others] = finalData;
    print('First:', first);
    print('Second:', second);
    print('Others:', others);
})();
