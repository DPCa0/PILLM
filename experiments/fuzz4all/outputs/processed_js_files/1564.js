 
async function fetchDataAndProcess() {
     
    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        let data = await response.json();
        
         
        let transformedData = data.map(post => ({
            title: post.title.toUpperCase(),
            wordsCount: post.body.split(' ').length
        }));

         
        let uniqueWordCounts = new Set(transformedData.map(post => post.wordsCount));

         
        const [first, ...rest] = [...uniqueWordCounts];

        print(`Unique word counts (first is ${first}):`, rest);

         
        let [longestTitle] = transformedData.sort((a, b) => b.wordsCount - a.wordsCount);
        
        print('Post with the longest body:', longestTitle);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
(async () => {
    await fetchDataAndProcess();
})();
