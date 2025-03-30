 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function complexTask() {
    const data = { 
        name: 'Advanced JS', 
        features: ['async/await', 'promises', 'generators', 'proxies', 'destructuring']
    };

    const processData = ({ name, features }) => {
        print(`Processing: ${name}`);
        features.forEach((feature, index) => {
            print(`Feature ${index + 1}: ${feature}`);
        });
    };

    const asyncOps = [
        delay(500).then(() => console.log('Step 1: Delay complete')),
        delay(300).then(() => console.log('Step 2: Another delay complete'))
    ];

    await Promise.all(asyncOps);
    processData(data);
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const dataProxy = new Proxy({ taskComplete: false }, handler);

(async function() {
    await complexTask();
    dataProxy.taskComplete = true;
    print(`Task Complete: ${dataProxy.taskComplete}`);
})();
