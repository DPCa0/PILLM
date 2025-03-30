 

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData() {
    await delay(2000);
    return {
        name: "Alice",
        age: 30,
        city: "Wonderland"
    };
}

function logData(data) {
    print("User Data:");
    Object.entries(data).forEach(([key, value]) => {
        print(`${key}: ${value}`);
    });
}

const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            return `Property ${prop} is not available.`;
        }
    }
};

async function main() {
    const rawData = await getData();
    const proxyData = new Proxy(rawData, handler);

    logData(proxyData);

    print(`Accessing non-existing property: ${proxyData.nonExistentProperty}`);
}

main();
