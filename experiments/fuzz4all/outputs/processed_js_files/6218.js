 

const fetchData = async (urls) => {
   
  try {
    const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
    
    const results = await Promise.all(fetchPromises);
    
    const processedData = results.map(({id, title, ...rest}) => ({
      id,
      title,
      summary: `${title} - Data Retrieved`,
      details: rest
    }));
    
    return processedData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const displayData = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  
  const data = await fetchData(urls);
  
  if (data) {
    data.forEach(({id, summary, details}) => {
      print(`ID: ${id}`);
      print(`Summary: ${summary}`);
      print('Details:', details);
    });
  }
};

displayData();
