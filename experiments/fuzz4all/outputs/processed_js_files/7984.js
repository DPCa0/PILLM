 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    
     
    let { results } = data;
    let filteredResults = results.filter(item => item.isActive);

     
    let transformedResults = filteredResults.map(({ id, name, details }) => ({
      id,
      name: name.toUpperCase(),
      detailSummary: details.join(', ')
    }));

     
    print(tagTemplate`Fetched and transformed ${transformedResults.length} active items.`);

     
    return new Promise(resolve => setTimeout(() => resolve(transformedResults), 1000));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
function tagTemplate(strings, ...expressions) {
  return strings.reduce((acc, str, i) => acc + str + (expressions[i] || ''), '');
}

 
(async () => {
  const apiURL = 'https://api.example.com/data';
  let results = await fetchData(apiURL);
  print('Results:', results);
})();
