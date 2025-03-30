 

(async () => {
   
  const { default: axios } = await import('https://cdn.skypack.dev/axios');
  
   
  async function fetchAndProcessData(url) {
    try {
       
      const response = await axios.get(url);

       
      const processedData = response.data.map(({ id, title }) => ({ id, title: title.toUpperCase() }));

       
      const uniqueTitles = [...new Set(processedData.map(item => item.title))];
      
       
      await Promise.all(uniqueTitles.map(title => 
        new Promise(resolve => setTimeout(() => {
          print(title);
          resolve();
        }, 1000))
      ));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  fetchAndProcessData('https://jsonplaceholder.typicode.com/posts');

})();
