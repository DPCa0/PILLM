(async function() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data from ${url}`);
    return response.json();
  };

  const processData = data => {
    const { id, title } = data;
    print(`Processing Data: [${id}] ${title}`);
  };

  const main = async () => {
    try {
      const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
      ];

      const results = await Promise.all(urls.map(fetchData));

      for (const result of results) {
        processData(result);
        await delay(1000);  
      }
      
      const [first, second] = results;
      print(`Combined Titles: ${first.title} & ${second.title}`);

      const destructuredData = results.map(({ userId, id, ...rest }) => ({ userId, id }));
      print('Destructured Data:', destructuredData);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  main();
})();
