 
async function* fetchDataSimulator() {
    for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield `Data chunk ${i}`;
    }
}

 
const loggingHandler = {
    get: (target, prop) => {
        print(`Getting property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { initial: 'value' };
const proxiedObject = new Proxy(targetObject, loggingHandler);

 
const { initial = 'default value', newProp = 'new default' } = proxiedObject;

 
const processData = ((...dataChunks) => {
    print('Processing data: ', dataChunks.join(', '));
})(...['Extra Data 1', 'Extra Data 2']);

 
(async () => {
    for await (const chunk of fetchDataSimulator()) {
        print(chunk);
    }

     
    print(proxiedObject.initial);
    proxiedObject.newProp = 'updated value';
    print(proxiedObject.newProp);

     
    print(proxiedObject?.nonExistentProp ?? 'Property does not exist');
})();
