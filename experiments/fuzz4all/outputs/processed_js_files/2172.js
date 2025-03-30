 

async function fetchData(url) {
   
  const fakeFetch = url => new Promise((resolve, reject) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });

  try {
    const data = await fakeFetch(url);
    return data;
  } catch (error) {
    throw new Error('Fetch error: ' + error);
  }
}

function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

const urls = ['https://api.example1.com', 'https://api.example2.com'];
const proxiedUrls = new Proxy(urls, handler);

async function main() {
  const generator = dataGenerator(proxiedUrls);

  for (const dataPromise of generator) {
    const data = await dataPromise;
    print(data);
  }
}

main().catch(console.error);
