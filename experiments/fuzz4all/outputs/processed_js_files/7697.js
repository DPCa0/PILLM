 

 
const fakeApiCall = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            Math.random() > 0.2 ? resolve({ data: "Hello, Advanced JS!" }) : reject("API Error: Service Unavailable");
        }, 1000);
    });
};

 
async function fetchData() {
    try {
        const response = await fakeApiCall();
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

 
const dataHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessed property: ${property}`);
            return target[property];
        } else {
            return `Property ${property} does not exist`;
        }
    }
};

 
(async () => {
    try {
        const data = await fetchData();
        
         
        const obj = new Proxy({ message: data, timestamp: new Date() }, dataHandler);
        
         
        print(obj.message);   
        print(obj.timestamp);  
        print(obj.nonExistentProp);  
        
    } catch (error) {
        console.error(error.message);
    }
})();
