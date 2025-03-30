const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
};

const processData = (data) => {
    return data.map(({ id, name, value }) => ({
        id,
        displayName: `${name} - ${value}`,
    })).reduce((acc, curr) => {
        acc[curr.id] = curr.displayName;
        return acc;
    }, {});
};

const startProcess = async () => {
    try {
        const rawData = await fetchData('https://api.example.com/data');
        const processedData = processData(rawData);
        print('Processed Data:', processedData);

        const arrayFromMap = Object.entries(processedData);
        const result = arrayFromMap.find(([key, value]) => value.includes('targetKeyword')) ?? ['No Match', 'N/A'];
        print('Search Result:', result);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

startProcess();
