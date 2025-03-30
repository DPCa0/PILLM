 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

 
function* dataGenerator(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting property '${prop}'`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

let obj = new Proxy({}, handler);

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];
  
  const generator = dataGenerator(urls);

  for (let promise of generator) {
    promise.then(data => {
      obj['data'] = data;   
      print(obj['data']);
    }).catch(error => {
      console.error('Error occurred:', error);
    });
  }
})();
