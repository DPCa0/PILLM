 

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'number' && value > 0) {
            target[prop] = value;
            print(`Property ${prop} set to ${value}`);
            return true;
        } else {
            print(`Invalid value for ${prop}`);
            return false;
        }
    }
};

const data = {
    x: 1,
    y: 2
};

const proxyData = new Proxy(data, handler);

async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ message: "Data fetched successfully", value: 42 });
        }, 1000);
    });
}

async function processData() {
    try {
        let result = await fetchData();
        print(result.message);
        proxyData.z = result.value;  
        print(`Z value: ${proxyData.z}`);
        print(`Invalid access: ${proxyData.nonexistentProperty}`);  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

proxyData.z = -5;  
processData();
