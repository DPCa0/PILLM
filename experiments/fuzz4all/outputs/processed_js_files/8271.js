 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Complex Data' });
        }, 1000);
    });
};

 
const handler = {
    get: function(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
(async function main() {
     
    const { data } = await fetchData();
    
     
    const proxiedData = new Proxy({ data }, handler);
    
     
    const itemID = idGen.next().value;
    
     
    proxiedData.itemID = itemID;
    proxiedData.data = proxiedData.data.toUpperCase();
    
     
    print(`Processed Item ${proxiedData.itemID}: ${proxiedData.data}`);
})();
