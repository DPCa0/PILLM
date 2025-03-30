 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
     
    const data = await response.json();

     
    const titles = data.map(({ title }) => title.toUpperCase());

     
    const uniqueTitles = new Set(titles);

     
    const formattedOutput = formatOutput`Unique Titles:\n${[...uniqueTitles].join('\n')}`;

     
    print(formattedOutput);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function formatOutput(strings, ...values) {
  return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
}

 
(async () => {
  await fetchDataAndProcess();
})();
