 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess(url) {
  try {
     
    const response = await fetch(url);
    const data = await response.json();

     
    const items = data?.items ?? [];

     
    const processedItems = items
      .filter(item => item?.active ?? false)
      .map(({ id, name, value }) => ({
        id,
        name: name?.toUpperCase(),
        value: value * 2
      }));

     
    function output(strings, ...values) {
      return strings.reduce((acc, str, index) => acc + str + (values[index] || ''), '');
    }

     
    print(output`Processed ${processedItems.length} items:`, processedItems);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
(async () => {
  await delay(2000);  
  await fetchDataAndProcess('https://jsonplaceholder.typicode.com/users');
})();
