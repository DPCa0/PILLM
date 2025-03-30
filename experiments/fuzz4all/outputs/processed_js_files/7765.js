 
(async () => {
     
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

     
    const processData = (data) => {
        const uniqueItems = new Set(data.map(item => item.value));
        const mapData = new Map();
        uniqueItems.forEach(item => {
            mapData.set(item, Symbol(item));
        });
        return mapData;
    };

     
    const createProxy = (data) => {
        return new Proxy(data, {
            get: (target, prop) => {
                print(`Accessing property: ${prop}`);
                return target[prop];
            }
        });
    };

    try {
        const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
        const rawData = await fetchData(dataUrl);
        const mapData = processData(rawData);

        print('Processed Map Data:', mapData);

        const proxyData = createProxy(rawData[0]);
        print('Accessing Proxy Data Title:', proxyData.title);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
