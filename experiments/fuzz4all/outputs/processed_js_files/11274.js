 

 
function* fetchDataSequence(urls) {
  for (const url of urls) {
    yield fetch(url).then((response) => response.json());
  }
}

 
async function handleData(urls) {
  const dataSequence = fetchDataSequence(urls);
  const results = [];
  
  for (const promise of dataSequence) {
    const data = await promise;
    results.push(data);
  }
  
  return results;
}

 
const handler = {
  set(target, key, value) {
    print(`Setting property ${key} to ${value}`);
    target[key] = value;
    return true;
  },
  get(target, key) {
    print(`Getting property ${key}`);
    return target[key];
  }
};

 
const fetchedData = new Proxy({}, handler);

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

 
async function init() {
  const data = await handleData(urls);
  data.forEach((item, index) => {
    fetchedData[`data_${index + 1}`] = item;
  });

   
  print(fetchedData.data_1);
}

 
init();
