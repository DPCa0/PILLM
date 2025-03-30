 
async function fetchDataAndProcess() {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    try {
         
        let response = await fetch(apiURL);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        let data = await response.json();

         
        let processedData = data
            .map(post => ({
                id: post.id,
                titleLength: post.title.length,
                bodyLength: post.body.length
            }))
            .filter(post => post.bodyLength > 100)
            .reduce((acc, post) => {
                acc.totalTitlesLength += post.titleLength;
                acc.totalBodiesLength += post.bodyLength;
                acc.count += 1;
                return acc;
            }, { totalTitlesLength: 0, totalBodiesLength: 0, count: 0 });

         
        const { totalTitlesLength, totalBodiesLength, count } = processedData;
        print(`Processed ${count} posts.`);
        print(`Total Titles Length: ${totalTitlesLength}`);
        print(`Total Bodies Length: ${totalBodiesLength}`);

    } catch (error) {
         
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    print('Starting data fetch and processing...');
    await fetchDataAndProcess();
    print('Data processing completed.');
})();
