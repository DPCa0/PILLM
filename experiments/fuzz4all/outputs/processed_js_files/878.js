const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
};

const processData = (data) => {
    return data
        ?.filter(item => item?.value > 10)
        .map(item => ({
            ...item,
            timestamp: new Date(item.timestamp).toLocaleString(),
        })) ?? [];
};

const logProcessedData = async (url) => {
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    
    console.group('Processed Data');
    processedData.forEach(item => {
        print(`ID: ${item.id}, Value: ${item.value}, Timestamp: ${item.timestamp}`);
    });
    console.groupEnd();
};

 
 
