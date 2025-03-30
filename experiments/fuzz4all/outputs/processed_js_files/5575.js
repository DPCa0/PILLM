 

 
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ data: [1, 2, 3, 4, 5] });
        }, 1000);
    });
}

 
function* dataProcessor(data) {
    for (let item of data) {
        yield item * 2;
    }
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} not found`);
            return undefined;
        }
    }
};

 
(async function main() {
    try {
         
        const { data } = await fetchData();

         
        const processor = dataProcessor(data);
        const processedData = Array.from(processor);

         
        const proxy = new Proxy({ processedData }, handler);

         
        const { processedData: [first, second, ...rest] } = proxy;
        print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
    } catch (error) {
        console.error("Error encountered:", error);
    }
})();
