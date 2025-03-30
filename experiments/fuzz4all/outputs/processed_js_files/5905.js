(async function() {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const processData = ([first, ...rest]) => {
    print('First Item:', first);
    return rest.map((item, index) => ({ id: index + 1, value: item * 2 }));
  };

   
  const formatOutput = (strings, ...values) => 
    strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');

   
  const displayUniqueItems = (data) => {
    const uniqueItems = new Set(data.map(item => item.value));
    uniqueItems.forEach(value => print(formatOutput`Unique Value: ${value}`));
  };

  try {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';  
    const data = await fetchData(dataUrl);
    
     
    const processedData = processData(data.map(item => item.id));
    displayUniqueItems(processedData);

  } catch (error) {
    console.error('Error:', error);
  }
})();
