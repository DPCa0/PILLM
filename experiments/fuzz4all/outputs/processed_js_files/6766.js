 

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

 
const processData = ({ name, ...details }) => {
    const fullDetails = { ...details, processed: true };
    return { name, fullDetails };
};

 
const createProxy = (obj) => {
    return new Proxy(obj, {
        get(target, property) {
            print(`Getting property: ${property}`);
            return target[property];
        },
        set(target, property, value) {
            print(`Setting property: ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    });
};

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/users/1';  
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    const userProxy = createProxy(processedData);

     
    print(userProxy.name);  
    userProxy.fullDetails.age = 30;  

    print('Final Processed Data:', processedData);
})();
