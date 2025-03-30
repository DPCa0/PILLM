 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data: "Complex JavaScript Program" }), 1000);
    });
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property ${prop} has been accessed.`);
        return Reflect.get(...arguments);
    }
};

const dataObject = new Proxy({ message: null }, handler);

 
function* dataGenerator(data) {
    for (const item of data) {
        yield item;
    }
}

 
(async function main() {
    try {
        const result = await fetchData();  
        dataObject.message = result.data;  
        const messageArray = dataObject.message.split(" ");
        
        const generator = dataGenerator(messageArray);
        let item = generator.next();
        
        while (!item.done) {
            print(item.value);  
            item = generator.next();
        }
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
