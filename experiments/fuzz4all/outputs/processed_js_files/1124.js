 

 
function asyncOperation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Processed: ${data}`);
        }, 1000);
    });
}

 
function* processGenerator(dataArray) {
    for (const data of dataArray) {
        yield asyncOperation(data);
    }
}

 
async function handleAsyncOperations(dataArray) {
    const generator = processGenerator(dataArray);
    for (const promise of generator) {
        const result = await promise;
        print(result);
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return `Intercepted: ${target[prop]}`;
        }
        return `Property "${prop}" not found.`;
    }
};

 
const targetObject = { name: 'Alice', age: 25 };
const proxy = new Proxy(targetObject, handler);

print(proxy.name);  
print(proxy.age);   
print(proxy.gender);  

 
handleAsyncOperations(['task1', 'task2', 'task3']);
