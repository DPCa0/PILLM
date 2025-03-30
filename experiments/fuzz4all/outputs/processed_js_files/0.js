 
async function* fetchDataConcurrently(urls) {
  const fetchPromises = urls.map(async url => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  });

  for (const promise of fetchPromises) {
    yield promise;
  }
}

 
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

 
const user = {
  name: 'Alice',
  age: 25
};

const userProxy = new Proxy(user, {
  set(target, property, value) {
    print(`Property ${property} changed from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  
  const dataGenerator = fetchDataConcurrently(urls);
  
  for await (const data of dataGenerator) {
    print('Fetched data:', data);
  }

  const debouncedFunction = debounce(() => print('Debounced function triggered'), 1000);
  debouncedFunction();
  debouncedFunction();
  setTimeout(debouncedFunction, 1500);

  userProxy.name = 'Bob';
  userProxy.age = 30;
})();
