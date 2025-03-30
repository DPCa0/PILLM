 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id: 1, name: "Sample Data" };
            resolve(data);
        }, 1000);
    });
};

 
const dataHandler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const uniqueId = Symbol("id");

 
(async () => {
    try {
        print("Fetching data...");
        const data = await fetchData();
        
         
        const { id, name } = data;

         
        const proxiedData = new Proxy(data, dataHandler);

         
        print("Fetched Data ID:", proxiedData.id);  
        proxiedData.name = "Updated Data";  
        print("Updated Data Name:", proxiedData.name);  

         
        proxiedData[uniqueId] = `Unique-${id}`;

        print("Data with unique ID:", proxiedData);

         
        print("Iterating over data:");
        for (const [key, value] of Object.entries(proxiedData)) {
            print(`${key}: ${value}`);
        }

        print(`Unique Identifier: ${proxiedData[uniqueId]}`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
