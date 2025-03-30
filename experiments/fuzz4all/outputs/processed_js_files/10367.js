 

 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
function* dataGenerator(dataArray) {
    for (let data of dataArray) {
        yield data;
    }
}

 
const handler = {
    get: function(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

const processData = async (url) => {
    try {
         
        const rawData = await fetchData(url);
        
         
        const dataProxy = new Proxy(rawData, handler);

         
        const generator = dataGenerator(dataProxy);
        let item = generator.next();

         
        while (!item.done) {
            print("Processing:", item.value);
             
            await new Promise(resolve => setTimeout(resolve, 1000));
            item = generator.next();
        }

        print("All data processed");
    } catch (error) {
        console.error("Error processing data:", error);
    }
};

 
processData("https://jsonplaceholder.typicode.com/posts");
