 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { data: "Some fetched data" };
}

 
const dataHandler = {
    get(target, property) {
        print(`Accessed property '${property}'`);
        return target[property];
    }
};

 
const processData = async () => {
    try {
        let dataObject = await fetchData();
        dataObject = new Proxy(dataObject, dataHandler);

        print(`Processing: ${dataObject.data}`);

        const enhancedData = { ...dataObject, enhanced: true };
        print(`Enhanced Data:`, enhancedData);
        
    } catch (error) {
        console.error(`Error encountered: ${error}`);
    }
};

 
class Util {
    static showMessage({ message }) {
        print(`Message: ${message}`);
    }
}

 
(async () => {
    await processData();
    Util.showMessage({ message: "Data processing complete!" });
})();
