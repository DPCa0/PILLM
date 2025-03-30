 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(2000);  
  return { data: 'Hello, complex world!' };
}

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item.toUpperCase();
  }
}

 
(async () => {
  try {
    const { data } = await fetchData();
    print('Data fetched:', data);

     
    const uniqueChars = new Set(data.split(''));
    const charMap = new Map();
    uniqueChars.forEach(char => {
      charMap.set(char, char.charCodeAt(0));
    });
    print('Unique Characters and their ASCII codes:', charMap);

     
    const handler = {
      get(target, prop) {
        print(`Accessing property '${prop}' with value: ${target[prop]}`);
        return target[prop];
      }
    };

    const proxiedData = new Proxy({ message: data }, handler);
    print('Proxied message:', proxiedData.message);

     
    const gen = dataGenerator(data.split(' '));
    print('Generated data:', gen.next().value, gen.next().value);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
