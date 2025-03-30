 
async function* fetchAndProcess(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();

       
      const { name, details: { description = 'No description available' } = {} } = data;

       
      yield `${name ?? 'Unnamed'}: ${description}`;
    } catch (error) {
       
      console.error(errorMessage`Error fetching ${url}: ${error.message}`);
    }
  }
}

 
function errorMessage(strings, url, error) {
  return `${strings[0]}${url}${strings[1]}${error}`;
}

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://invalid.url.com/user/3'
  ];

   
  const results = fetchAndProcess(urls);
  for await (const message of results) {
    print(message);
  }
})();
