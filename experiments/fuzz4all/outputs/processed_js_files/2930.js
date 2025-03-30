 

 
const range = function*(start, end) {
    for (let i = start; i < end; i++) {
        yield i;
    }
};

 
async function fetchDataAndProcess(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

         
        const { items, ...rest } = data;
        print('Other Data:', rest);

         
        const processedItems = items.map(({ id, value }) => ({
            id,
            value: value * 2
        }));

        print('Processed Items:', processedItems);

         
        const itemSet = new Set(processedItems.map(item => item.id));
        print('Unique IDs:', itemSet);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    const url = 'https://api.example.com/data';  

     
    const simulatedFetch = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                items: [
                    { id: 1, value: 10 },
                    { id: 2, value: 20 },
                    { id: 3, value: 30 },
                ],
                meta: {
                    count: 3,
                    source: 'simulated'
                }
            });
        }, 1000);
    });

     
    await fetchDataAndProcess(url);
    for await (const num of range(0, 5)) {
        print('Range Number:', num);
    }
})();
