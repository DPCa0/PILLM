const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

const processAndDisplayData = async (url) => {
    try {
        const data = await fetchData(url);
        const filteredData = data.filter(item => item.active)
                                 .map(item => ({ id: item.id, value: item.value * 2 }));
        
        const displayData = (data) => data.forEach(item => print(`ID: ${item.id}, Value: ${item.value}`));

         
        const handler = {
            get: function(target, prop, receiver) {
                if (prop in target) {
                    print(`Accessing ${prop}`);
                    return Reflect.get(...arguments);
                } else {
                    console.warn(`Property ${prop} does not exist`);
                    return undefined;
                }
            }
        };

        const proxyData = new Proxy(filteredData, handler);
        displayData(proxyData);
    } catch (error) {
        console.error('Error:', error);
    }
};

const mockUrl = 'https://api.example.com/data';
processAndDisplayData(mockUrl);
