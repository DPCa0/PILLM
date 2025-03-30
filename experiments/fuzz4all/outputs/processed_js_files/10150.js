 

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

function* processItems(items) {
    for (let item of items) {
        yield item * 2;  
    }
}

const dataHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property "${prop}" not found!`);
            return undefined;
        }
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value;
            print(`Property "${prop}" set to ${value}`);
        } else {
            print(`Property "${prop}" can only be set to a number!`);
        }
        return true;
    }
};

(async () => {
    const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', apiData);

    const items = [1, 2, 3, 4, 5];
    const processedItems = processItems(items);
    print('Processed Items:');
    for (let item of processedItems) {
        print(item);
    }

    const targetObject = { existingProp: 42 };
    const proxiedObject = new Proxy(targetObject, dataHandler);

    print('Existing Property:', proxiedObject.existingProp);  
    proxiedObject.existingProp = 100;  
    print('Updated Existing Property:', proxiedObject.existingProp);  

    print('Non-existent Property:', proxiedObject.nonExistentProp);  
    proxiedObject.newProp = 'not a number';  
    proxiedObject.newProp = 7;  
    print('Newly Set Property:', proxiedObject.newProp);  
})();
