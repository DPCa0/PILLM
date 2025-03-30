 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

     
    const titles = data
      .map(({ id, title }) => ({ id, title }))
      .filter(({ id }) => id % 2 === 0)
      .map(({ title }) => title.toUpperCase());

     
    const processedTitles = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(titles);
      }, 1000);
    });

     
    const uniqueTitles = [...new Set(processedTitles)];
    print(`Unique Processed Titles:\n${uniqueTitles.join('\n')}`);
  } catch (error) {
     
    const errorMessage = {
      error: 'Data fetching failed',
      details: error.message
    };
    console.error(errorMessage);
  }
}

 
(async () => {
  await fetchDataAndProcess();
})();
