const fetchData = async (url) => {
   
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processItems = (items) => {
   
  const totalValue = items
    .map(item => ({ ...item, value: item.price * item.quantity }))
    .reduce((acc, item) => acc + item.value, 0);
  print('Total inventory value:', totalValue);
};

const getUniqueCategories = (items) => {
   
  const categories = items.map(item => item.category);
  return [...new Set(categories)];
};

(async () => {
  const url = 'https://api.example.com/inventory';
  const data = await fetchData(url);
  if (data) {
    processItems(data);
    const categories = getUniqueCategories(data);
    print('Unique categories:', categories.join(', '));
  }
})();
