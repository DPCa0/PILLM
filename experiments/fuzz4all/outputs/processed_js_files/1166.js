(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

   
  const processData = (data) => {
    const uniqueItems = new Set(data.map(item => item.category));
    const categoryMap = new Map();

    uniqueItems.forEach(category => {
      categoryMap.set(category, data.filter(item => item.category === category));
    });

    return categoryMap;
  };

   
  const url = 'https://api.sampleapis.com/coffee/hot';
  const data = await fetchData(url);

  if (data) {
     
    const categorizedData = processData(data);

     
    for (const [category, items] of categorizedData) {
      print(`\nCategory: ${category}`);
      items.forEach(({ title, description }) => {
        print(`- ${title}: ${description}`);
      });
    }
  }
})();
