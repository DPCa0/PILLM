 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
function processData(items) {
  return items
    .filter(({ price }) => price > 20)
    .map(({ name, price }) => ({ name: name.toUpperCase(), price }))
    .reduce((acc, { name, price }) => {
      acc.totalPrice += price;
      acc.names.push(name);
      return acc;
    }, { totalPrice: 0, names: [] });
}

 
const uniqueArray = (array) => [...new Set(array)];

 
(async () => {
  try {
    const dataUrl = 'https://api.example.com/items';
    const items = await fetchData(dataUrl);
    const { totalPrice, names } = processData(items);
    
    print(`Total Price: ${totalPrice}`);
    print(`Item Names: ${uniqueArray(names).join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
