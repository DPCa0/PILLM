const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    return data
        .filter(item => item.active)
        .map(({ id, name, info }) => ({
            id,
            name: name.toUpperCase(),
            details: {
                ...info,
                status: 'Processed'
            }
        }));
};

const executeTasks = async () => {
    try {
        const urls = [
            'https://api.example.com/data1',
            'https://api.example.com/data2',
            'https://api.example.com/data3'
        ];

        const dataPromises = urls.map(url => fetchData(url));
        const results = await Promise.allSettled(dataPromises);

        const successfulData = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value)
            .flat();

        const processedData = processData(successfulData);

        const structuredData = processedData.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
        }, {});

        print('Structured Data:', structuredData);
    } catch (error) {
        console.error('Error:', error);
    }
};

executeTasks();
