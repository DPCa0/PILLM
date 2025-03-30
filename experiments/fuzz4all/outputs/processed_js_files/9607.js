 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

     
    const { results } = data;
    const names = results.map(({ name: { first, last } }) => `${first} ${last}`);
    const processedNames = [...new Set(names)].sort();

     
    const handler = {
      get(target, prop) {
        if (prop === 'length') {
          return target.length;
        }
        if (prop in target) {
          return `Name at position ${prop}: ${target[prop]}`;
        }
        return 'Property does not exist';
      },
    };
    
    const proxyNames = new Proxy(processedNames, handler);
    print(`Total unique names: ${proxyNames.length}`);
    print(proxyNames[0]);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
}

 
function url(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

const apiUrl = url`https: 
fetchData(apiUrl);
