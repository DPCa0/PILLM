 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000);
});

async function* dataGenerator() {
    const response = await fetchData();
    for (const item of response.data) {
        yield item;
    }
}

const dataHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} not found`;
        }
    }
};

const processData = async () => {
    const dataGen = dataGenerator();
    const handler = new Proxy({}, dataHandler);

    for await (const value of dataGen) {
        handler[`item${value}`] = value * 2;
    }

    print(handler.item1);   
    print(handler.item6);   
};

processData();
