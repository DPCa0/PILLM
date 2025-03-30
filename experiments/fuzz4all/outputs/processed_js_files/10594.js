 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
     
    await delay(1000);
    return { data: "Sample Data" };
}

 
const dataHandler = {
    get(target, prop) {
        if (prop === 'data') {
            print('Accessing data property');
        }
        return target[prop];
    },
    set(target, prop, value) {
        if (prop === 'data') {
            print('Modifying data property');
        }
        target[prop] = value;
        return true;
    }
};

 
(async function main() {
    try {
         
        let dataObject = await fetchData();
        
         
        const proxyData = new Proxy(dataObject, dataHandler);

         
        print(proxyData.data);  

         
        proxyData.data = "New Sample Data";  
    } catch (error) {
        console.error('Error:', error);
    }
})();
