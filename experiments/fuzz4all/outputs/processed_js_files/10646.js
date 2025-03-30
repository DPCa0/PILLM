 

(async () => {
   
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const uniqueUrls = new Set([
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ]);

   
  const fetchData = async (urls) => {
    return Promise.all(
      [...urls].map(async (url) => {
        try {
          const response = await axios.get(url);
           
          const { data } = response;
          return data;
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
          return null;
        }
      })
    );
  };

   
  const processData = async () => {
    const data = await fetchData(uniqueUrls);
    const filteredData = data.filter(item => item !== null);  
    print('Processed Data:', filteredData);
  };

  await processData();
})();
