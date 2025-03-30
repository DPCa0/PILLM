 

 
const fetchData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { id, value: `Item${id}` };
            id % 2 === 0 ? resolve(data) : reject(`Error fetching data for ID ${id}`);
        }, 1000);
    });
};

 
async function getItems(ids) {
    const results = await Promise.allSettled(ids.map(id => fetchData(id)));
    return results.map(result => 
        result.status === 'fulfilled' ? result.value : { error: result.reason }
    );
}

 
const mapHandler = {
    get(target, prop, receiver) {
        print(`Accessing key: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting key: ${prop} with value: ${JSON.stringify(value)}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
(async () => {
    const map = new Proxy(new Map(), mapHandler);

    print('Fetching items...');
    const items = await getItems([1, 2, 3, 4, 5]);
    
    items.forEach(item => {
        if (item.error) {
            console.error(item.error);
        } else {
            map.set(item.id, item.value);
        }
    });
    
    print('Stored data:');
    print(map.get(2));  
    print(map.get(4));  
})();
