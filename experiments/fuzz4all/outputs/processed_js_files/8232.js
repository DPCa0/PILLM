 
async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);  
    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();  
     
    const processedData = { ...data, processedAt: new Date() };

     
    const handler = {
      get(target, property) {
        print(`Accessing property "${property}"`);
        return target[property];
      }
    };

    const proxiedData = new Proxy(processedData, handler);

     
    function formatOutput(strings, name, date) {
      return `${strings[0]}${name}${strings[1]}${date.toLocaleString()}${strings[2]}`;
    }
    
     
    print(formatOutput`Data from ${proxiedData.name} was processed at ${proxiedData.processedAt}.`);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function* urlGenerator() {
  yield 'https://jsonplaceholder.typicode.com/todos/1';
  yield 'https://jsonplaceholder.typicode.com/todos/2';
}

 
const urls = urlGenerator();
for (const url of urls) {
  fetchAndProcessData(url);
}
