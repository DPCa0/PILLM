 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Fetched data from ${url}`);
    }, 1000);
  });
}

 
function* dataFetcher(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const urlHandler = {
  get(target, prop, receiver) {
    if (prop === 'length') {
      print('Getting number of URLs');
    }
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting URL at index ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const urlList = new Proxy(['https://api.example.com/data1', 'https://api.example.com/data2'], urlHandler);

 
async function handleData() {
  const gen = dataFetcher(urlList);
  for (const promise of gen) {
    const data = await promise;
    print(data);
  }
}

 
handleData();

 
urlList.push('https://api.example.com/data3');
print(`Updated URL list length: ${urlList.length}`);
