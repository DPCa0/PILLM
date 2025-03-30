 

 
const handler = {
    get(target, property) {
        if (property === Symbol.toStringTag) {
            return 'CustomObject';
        }
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property ${property.toString()} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

 
const data = new Proxy({ value: 42 }, handler);

 
async function* asyncGenerator(obj) {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield obj.value + i;
    }
}

 
print(Object.prototype.toString.call(data));  

 
(async () => {
    for await (let val of asyncGenerator(data)) {
        print(`Generated value: ${val}`);
    }

     
    data.value = 100;
    
    for await (let val of asyncGenerator(data)) {
        print(`Generated value after modification: ${val}`);
    }
})();
