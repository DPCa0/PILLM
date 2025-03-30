 

async function* fetchDataGenerator(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        yield data;
    }
}

const handler = {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        } else {
            throw new Error(`Property '${property}' not found on target.`);
        }
    },
    set: function(target, property, value) {
        if (property in target) {
            print(`Setting '${property}' to '${value}'.`);
            target[property] = value;
            return true;
        } else {
            throw new Error(`Property '${property}' not found on target.`);
        }
    }
};

const createEnhancedObject = (obj) => {
    return new Proxy(obj, handler);
};

(async function() {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2',
    ];

    const dataIterator = fetchDataGenerator(urls);

    const results = [];
    for await (let data of dataIterator) {
        const enhancedData = createEnhancedObject(data);
        results.push(enhancedData);

         
        try {
            print(enhancedData.someProperty);
        } catch (error) {
            console.error(error.message);
        }

         
        try {
            enhancedData.someProperty = 'new value';
        } catch (error) {
            console.error(error.message);
        }
    }

    print(results);
})();
