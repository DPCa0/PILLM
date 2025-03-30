 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
});

const handler = {
    get(target, prop, receiver) {
        if (prop === Symbol.toPrimitive) {
            return () => target.toString();
        }
        if (prop in target) {
            return target[prop];
        }
        return `Property "${prop}" not found!`;
    }
};

const symbolKey = Symbol('uniqueKey');
let obj = new Proxy({ [symbolKey]: 123, info: 'This is a Proxy object' }, handler);

(async function complexJS() {
    try {
        const data = await fetchData();
        print(`Fetched data: ${data.data}`);

        print(`Access info property: ${obj.info}`);
        print(`Access non-existent property: ${obj.nonExistent}`);
        
        print(`Access Symbol property: ${obj[symbolKey]}`);
        print(`Primitive representation: ${obj}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
