 

async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Complex JavaScript", version: 1.0 };
            resolve(data);
        }, 1000);
    });
}

function* dataProcessor(data) {
    yield `Name: ${data.name}`;
    yield `Version: ${data.version}`;
}

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    }
};

async function main() {
    try {
        const rawData = await fetchData();
        const proxyData = new Proxy(rawData, handler);
        const processor = dataProcessor(proxyData);

        for (let info of processor) {
            print(info);
        }

         
        print(proxyData.nonExistingProp);
    } catch (error) {
        console.error(error.message);
    }
}

main();
