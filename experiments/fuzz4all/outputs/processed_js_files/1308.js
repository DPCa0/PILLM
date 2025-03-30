 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
}

 
function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
async function processData(urls) {
  const iterator = dataGenerator(urls);

  for (const promise of iterator) {
    try {
      const result = await promise;
      print(result.data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
const urls = new Proxy(['https://api.example.com/1', 'https://api.example.com/2'], {
  get(target, prop) {
    if (prop in target) {
      print(`Getting URL: ${target[prop]}`);
      return target[prop];
    } else {
      console.error('URL not found');
      return null;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'string' && value.startsWith('https://')) {
      print(`Setting URL: ${value}`);
      target[prop] = value;
      return true;
    } else {
      console.error('Invalid URL');
      return false;
    }
  }
});

 
processData(urls);
