const asyncOperation = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    try {
        await delay(1000);
        print('Step 1: Initialization complete');
        
        const data = await fetch('https://api.example.com/data')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            });
        
        print('Step 2: Data fetched', data);
        
        const processedData = data.map(item => ({
            id: item.id,
            value: item.value * 2,
        }));

        print('Step 3: Data processed', processedData);

        const aggregatedData = processedData.reduce((acc, item) => acc + item.value, 0);
        
        print('Step 4: Data aggregated', aggregatedData);
        
        await delay(500);
        print('Step 5: Process complete');
        
    } catch (error) {
        console.error('Error occurred:', error);
    }
};

(async () => {
    print('Starting complex operation');
    await asyncOperation();
})();
