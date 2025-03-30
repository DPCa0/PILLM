 
const processData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    
     
    const titles = data.map(({ id, title }) => ({ id, title: title.toUpperCase() }));

     
    const uniqueTitles = [...new Set(titles.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

     
    const lookup = uniqueTitles.reduce((acc, { id, title }) => {
      acc[id] = title;
      return acc;
    }, {});

     
    print(lookup);
  } catch (error) {
     
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
  await processData();
})();
