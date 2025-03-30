 
(async () => {
   
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  function* dataGenerator(dataArray) {
    for (const item of dataArray) {
      yield item;
    }
  }

   
  async function main() {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    
     
    const safeData = data?.slice(0, 5) ?? [];
    
     
    const [firstPost, ...otherPosts] = safeData;

    print('First post:', firstPost);

     
    const allPosts = [...safeData];

     
    const postGenerator = dataGenerator(allPosts);
    let result = postGenerator.next();

    while (!result.done) {
      print('Processing post:', result.value);
      result = postGenerator.next();
    }

     
    const fetchPromises = [1, 2, 3].map((id) =>
      fetchData(`https: 
    );

    Promise.all(fetchPromises)
      .then((results) => {
        print('Fetched posts with Promise.all:', results);
      })
      .catch((error) => {
        console.error('Error with Promise.all:', error);
      });
  }

   
  main();
})();
