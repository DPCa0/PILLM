 

 
const fetchData = (delay, data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data ? resolve(`Data received: ${data}`) : reject('No data found');
        }, delay);
    });
};

 
async function processData() {
    try {
        const result1 = await fetchData(1000, 'User Data');
        print(result1);

        const result2 = await fetchData(1000, 'Order Details');
        print(result2);

        return 'Process completed successfully';
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

 
const handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const user = new Proxy({}, handler);

 
(async function main() {
     
    print(user.name);  
    user.name = 'Alice';
    print(user.name);  

     
    try {
        const finalMessage = await processData();
        print(finalMessage);
    } catch (error) {
        print('Process failed.');
    }
})();
