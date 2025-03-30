 
const fetchData = async () => {
    try {
         
        const simulateAPICall = () => new Promise((resolve) => {
            setTimeout(() => resolve({ data: [1, 2, 3, 4, 5], info: 'Sample Data' }), 1000);
        });

        const response = await simulateAPICall();
        
         
        const { data, info } = response;
        const transformedData = [...data.map(x => x * 2), ...data.map(x => x - 1)];

        print(`Info: ${info}`);
        print(`Transformed Data: ${transformedData}`);

         
        const handler = {
            get(target, property) {
                print(`Accessed element at index: ${property}`);
                return property in target ? target[property] : 'Not Found';
            }
        };

        const proxiedData = new Proxy(transformedData, handler);

         
        print(proxiedData[0]);  
        print(proxiedData[10]);  

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();
