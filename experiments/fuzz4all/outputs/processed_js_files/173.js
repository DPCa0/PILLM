 
async function fetchDataAndProcess(urls) {
  try {
     
    let fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    let data = await Promise.all(fetchPromises);

     
    let allItems = data.flatMap(({ items }) => items);
    
     
    let uniqueItems = [...new Set(allItems.map(item => item.id))];

     
    let itemMap = uniqueItems.reduce((acc, id) => {
      acc[id] = allItems.find(item => item.id === id);
      return acc;
    }, {});

     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.values(itemMap));
      }, 1000);
    });
    
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2'
];

fetchDataAndProcess(urls).then(result => print(result));
