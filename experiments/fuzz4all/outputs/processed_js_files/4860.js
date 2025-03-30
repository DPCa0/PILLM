 

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

function* dataProcessor(data) {
    for (let item of data) {
        yield {
            ...item,
            processed: true,
            timestamp: new Date().toISOString(),
        };
    }
}

const processInBatches = async (url, batchSize) => {
    try {
        const data = await fetchData(url);

        const processor = dataProcessor(data);
        let batch = [];

        for (let processedItem of processor) {
            batch.push(processedItem);
            if (batch.length === batchSize) {
                print('Processing batch:', batch);
                batch = [];
            }
        }

        if (batch.length) {
            print('Processing final batch:', batch);
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

 
const url = 'https://jsonplaceholder.typicode.com/posts';
processInBatches(url, 5);
