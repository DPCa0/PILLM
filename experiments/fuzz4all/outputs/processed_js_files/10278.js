 

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: { value: 42, message: 'The answer to everything' } });
        }, 1000);
    });
}

 
const dataHandler = {
    get: function(target, prop, receiver) {
        if (prop === 'value') {
            print(`Accessed property "${prop}"`);
            return Reflect.get(target, prop, receiver) * 2;  
        }
        return Reflect.get(target, prop, receiver);
    }
};

async function complexOperation() {
    try {
        print('Fetching data...');
        const response = await fetchData();
        const proxiedData = new Proxy(response.data, dataHandler);

         
        const { value, message } = proxiedData;
        print(`Result: ${value}, Message: "${message}"`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
complexOperation();
