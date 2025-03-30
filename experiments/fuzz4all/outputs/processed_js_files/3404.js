 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        let data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

 
class DataProcessor {
    static processData(data) {
        return data.map(({ name, value }) => ({ name: name.toUpperCase(), value: value * 2 }));
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property ${prop} has been accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};

const dataProxy = new Proxy(DataProcessor, handler);

 
function handleMultiplePromises(urls) {
    return Promise.all(urls.map(url => fetchData(url)))
        .then(results => results.flatMap(data => dataProxy.processData(data)));
}

 
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const processedData = await handleMultiplePromises(urls);
    print(processedData);
})();
