const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching error:', error);
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

const main = async () => {
  const url = 'https://api.example.com/data';
  const data = await fetchData(url);

  if (data) {
    const categoryMap = processData(data);
    
     
    for (const [category, items] of categoryMap.entries()) {
      print(`Category: ${category} has ${items.length} items`);
      items.forEach(({ id, name }) => {
        print(`Item ID: ${id}, Item Name: ${name}`);
      });
    }
  }
};

main();
