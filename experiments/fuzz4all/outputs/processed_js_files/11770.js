 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  };

   
  const getProcessedData = async () => {
    const promises = Array.from({ length: 5 }, (_, index) =>
      fetchData(`${url}/${index + 1}`)
    );

    const results = await Promise.allSettled(promises);
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value)
      .reduce((acc, data) => {
        acc.push({
          id: data.id,
          title: data.title.toUpperCase(),
          excerpt: data.body.slice(0, 30) + '...',
        });
        return acc;
      }, []);
  };

   
  const renderData = (data) => {
    data.forEach(({ id, title, excerpt }) => {
      print(`ID: ${id}\nTitle: ${title}\nExcerpt: ${excerpt}\n`);
    });
  };

  try {
    const data = await getProcessedData();
    renderData(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
