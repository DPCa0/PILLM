 

const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { message: 'Fetched data successfully' };
        resolve(data);
    }, 1000);
});

const dataHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessed property: ${property}`);
            return target[property];
        } else {
            throw new Error(`Property ${property} doesn't exist.`);
        }
    }
};

function* generateData(amount) {
    let count = 1;
    while (count <= amount) {
        yield count++;
    }
}

async function processData(url) {
    try {
        const rawData = await fetchData(url);
        const proxyData = new Proxy(rawData, dataHandler);

        const gen = generateData(5);
        for (let value of gen) {
            print(`Generated value: ${value}`);
        }

        print(proxyData.message);

    } catch (error) {
        console.error('Error processing data:', error);
    }
}

processData('https: 
