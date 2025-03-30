const runComplexOperation = async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const fetchData = async (url) => {
        await delay(1000);  
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    const manipulateData = (data) => {
        return data.map((item) => ({
            ...item,
            randomValue: Math.random(),
        })).filter(item => item.randomValue > 0.5);
    };

    try {
        const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';
        const data = await fetchData(apiEndpoint);
        const manipulatedData = manipulateData(data);
        
         
        const uniqueData = new Set(manipulatedData.map(item => JSON.stringify(item)));
        const finalData = Array.from(uniqueData).map(item => JSON.parse(item));

         
        const handler = {
            get(target, property) {
                print(`Accessed property: ${property}`);
                return target[property];
            }
        };

        const proxiedData = new Proxy(finalData, handler);
        print(proxiedData);
    } catch (error) {
        console.error('Error fetching or manipulating data:', error);
    }
};

runComplexOperation();
