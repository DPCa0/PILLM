 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });
};

 
const logger = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Set property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
async function processData() {
    const map = new Map();
    const dataProxy = new Proxy(map, logger);
    
    try {
         
        const response = await fetchData();
        const dataArray = response.data;
        
         
        dataArray.forEach((num, index) => {
            dataProxy.set(index, num * 2);  
        });
        
         
        for (let i = 0; i < dataArray.length; i++) {
            print(`Double value at index ${i}: ${dataProxy.get(i)}`);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
processData();
