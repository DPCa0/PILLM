 

 
const fetchData = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, data: `Data for ${id}` });
        }, Math.random() * 1000);
    });
};

 
function* idGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing ${prop} from target`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} does not exist`);
            return null;
        }
    }
};

 
(async () => {
    const ids = Array.from(idGenerator(1, 5));
    const promises = ids.map(id => fetchData(id));

    try {
        const dataArray = await Promise.all(promises);
        const dataObj = dataArray.reduce((acc, item) => {
            acc[item.id] = item.data;
            return acc;
        }, {});

        const proxyData = new Proxy(dataObj, handler);

         
        print(proxyData[1]);  
        print(proxyData[10]);  

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
