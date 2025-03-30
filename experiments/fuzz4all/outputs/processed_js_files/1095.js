 
async function complexOperation() {
     
    const fetchData = async (url) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {  
                    resolve(`Data from ${url}`);
                } else {
                    reject('Fetch error');
                }
            }, 1000);
        });
    };

     
    const urls = ['https://api.example.com/endpoint1', 'https://api.example.com/endpoint2'];
    try {
        const results = await Promise.all(urls.map(url => fetchData(url)));
        print('Fetched data:', results);
    } catch (error) {
        console.error('Error in fetching:', error);
        return;
    }

     
    const processData = (data) => {
        return data.map((datum, index) => ({
            id: index,
            content: datum.toUpperCase(),
            timestamp: new Date().toISOString()
        }));
    };

    const dataToProcess = ['sample data 1', 'sample data 2'];
    const processedData = processData(dataToProcess);
    print('Processed data:', processedData);

     
    const enhancedData = processedData.flatMap(item => 
        [item, { ...item, content: item.content.toLowerCase() }]
    );
    print('Enhanced data:', enhancedData);

     
    const dataMap = new Map();
    enhancedData.forEach(item => dataMap.set(item.id, item));

    const uniqueContentSet = new Set(enhancedData.map(item => item.content));
    print('Data Map:', dataMap);
    print('Unique Content Set:', uniqueContentSet);

     
    const [{ content: firstContent }, ...otherItems] = enhancedData;
    print('First content:', firstContent);
    print('Other items:', otherItems);
}

 
complexOperation();
