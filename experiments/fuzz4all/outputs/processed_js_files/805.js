 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, data: 'Sample Data' });
        }, 1000);
    });
}

 
async function getData() {
    const data = await fetchData();
    print('Fetched Data:', data);
    return data;
}

 
function* incrementor(start = 0) {
    let count = start;
    while (true) {
        yield count++;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        } else {
            throw new Error('Property value must be a number');
        }
    }
};

 
const dataProxy = new Proxy({ count: 0 }, handler);

 
(async () => {
    print('Starting data fetch and increment operation...');

    const fetchedData = await getData();

    const inc = incrementor(1);
    print('Incrementor:', inc.next().value);  
    print('Incrementor:', inc.next().value);  

    dataProxy.count = 10;
    print('Proxy Count:', dataProxy.count);  

    try {
        dataProxy.count = 'not a number';  
    } catch (err) {
        console.error(err.message);
    }

    print('Non-existent property:', dataProxy.nonExistent);  

    print('Completed data fetch and increment operation.');
})();
