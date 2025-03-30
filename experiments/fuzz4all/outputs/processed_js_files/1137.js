 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve({ id: 1, name: 'Data', value: 42 }) : reject('Fetch error');
    }, 1000);
});

 
const processValue = ({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    processedValue: value * 2
});

 
class DataHandler {
    constructor() {
        this.data = null;
    }
    
    async retrieveAndProcessData() {
        try {
            const fetchedData = await fetchData();
            this.data = processValue(fetchedData);
            print('Data successfully retrieved and processed:', this.data);
        } catch (error) {
            console.error('Error during data retrieval:', error);
        }
    }
}

 
const dataHandler = new DataHandler();
const handlerProxy = new Proxy(dataHandler, {
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
});

 
handlerProxy.retrieveAndProcessData();
