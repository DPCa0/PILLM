 

 
function* fetchDataGenerator(urls) {
  for (let url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
async function handleData(urls) {
  const generator = fetchDataGenerator(urls);

  let result = generator.next();
  while (!result.done) {
    try {
      const data = await result.value;  
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    result = generator.next();
  }
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

const handler = {
  get: function(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

const proxiedUrls = new Proxy(urls, handler);

 
(async () => {
  await handleData(proxiedUrls);
})();
