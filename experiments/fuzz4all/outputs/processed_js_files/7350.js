 
const fetchData = async (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
const fetchAllData = async (urls) => {
    try {
        const dataPromises = urls.map(url => fetchData(url));
        const results = await Promise.all(dataPromises);
        return results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
const handler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const dataObject = new Proxy({}, handler);

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield data;
    }
}

 
(async () => {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const fetchedData = await fetchAllData(urls);

     
    fetchedData.forEach((data, index) => {
        dataObject[`data${index + 1}`] = data;
    });

     
    const generator = dataGenerator(Object.values(dataObject));

    for (const data of generator) {
        print('Yielded Data:', data);
    }
})();
