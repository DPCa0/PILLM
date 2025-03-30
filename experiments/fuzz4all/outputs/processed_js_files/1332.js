 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
};

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const processUrls = async (gen) => {
  const results = [];
  for (const url of gen) {
    try {
      const result = await fetchData(url);
      results.push(result.data);
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
    }
  }
  return results;
};

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target object`);
      return undefined;
    }
  },
  set: function(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataStore = new Proxy({}, handler);

 
(async () => {
  print('Starting process...');

   
  dataStore.config = { retryAttempts: 3 };

   
  const urls = urlGenerator();
  const results = await processUrls(urls);

   
  dataStore.results = results;

   
  print('Final Results:', dataStore.results);
})();

