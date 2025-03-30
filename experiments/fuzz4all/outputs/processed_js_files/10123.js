 

 
const secretSymbol = Symbol('secret');

 
async function* fetchData() {
    const dataChunks = ["data1", "data2", "data3"];
    for (const chunk of dataChunks) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield chunk;
    }
}

 
const targetObject = {
    [secretSymbol]: "This is a secret value",
    normalProperty: "I am a normal property",
    async *[Symbol.asyncIterator]() {
        yield* fetchData();
    }
};

 
const handler = {
    get: (obj, prop) => {
        if (prop === secretSymbol) {
            return `Accessing hidden: ${obj[prop]}`;
        }
        return prop in obj ? obj[prop] : `Property ${prop.toString()} does not exist.`;
    },
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            obj[prop] = value.toUpperCase();
            return true;
        }
        return false;
    }
};

 
const proxiedObject = new Proxy(targetObject, handler);

 
print(proxiedObject[secretSymbol]);  
print(proxiedObject.normalProperty);  
print(proxiedObject.nonExistent);     

 
proxiedObject.newProperty = 'new value';
print(proxiedObject.newProperty);  

 
proxiedObject.nonStringProperty = 123;
print(proxiedObject.nonStringProperty);  

 
(async () => {
    for await (const data of proxiedObject) {
        print(`Received chunk: ${data}`);
    }
})();
