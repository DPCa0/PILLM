 

async function* fetchSequentially(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

const apiUrls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property ${prop} does not exist.`);
      return null;
    }
  }
};

const dataProxy = new Proxy({}, handler);

(async () => {
  let index = 1;
  for await (const dataPromise of fetchSequentially(apiUrls)) {
    const data = await dataPromise;
    dataProxy[`post${index}`] = data;
    print(dataProxy[`post${index}`]);  
    index++;
  }

   
  print(dataProxy.nonExistentProperty);
})();
