 
const calculateSum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

 
const handler = {
    get: (target, prop) => {
        print(`Getting ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const monitoredObject = new Proxy({ name: 'Advanced JS' }, handler);

 
const asyncOperation = async () => {
    print('Starting async operation...');
    const result = await new Promise(resolve => setTimeout(() => resolve('Operation Completed'), 2000));
    print(result);
};

 
const displayInfo = ({ name }) => {
    print(`Welcome to ${name}`);
};

 
(async () => {
    monitoredObject.name = 'Proxy Magic';
    displayInfo(monitoredObject);

    print('Sum:', calculateSum(1, 2, 3, 4, 5));

    await asyncOperation();
})();
