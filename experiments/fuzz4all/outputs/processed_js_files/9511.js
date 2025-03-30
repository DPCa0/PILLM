 
(async () => {
  const { readFile } = await import('fs/promises');

   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop, receiver);
      } else {
        print(`Property '${prop}' does not exist.`);
        return undefined;
      }
    },
    set(target, prop, value) {
      print(`Property '${prop}' set to '${value}'.`);
      return Reflect.set(target, prop, value);
    },
  };

  const dynamicObject = new Proxy({}, handler);
  
  dynamicObject.name = 'JavaScript';
  print(dynamicObject.name);
  print(dynamicObject.nonExistentProperty);

   
  const fetchURLs = async (urls) => {
    const fetchPromises = urls.map(url => fetch(url).then(res => res.text()));
    const results = await Promise.allSettled(fetchPromises);
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`Fetch successful for URL ${urls[index]}: ${result.value.substring(0, 50)}...`);
      } else {
        console.error(`Fetch failed for URL ${urls[index]}: ${result.reason}`);
      }
    });
  };

  const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];
  fetchURLs(urls);

   
  function log(strings, ...values) {
    print(strings.raw[0] + values.map((v, i) => v + strings.raw[i + 1]).join(''));
  }

  const status = 'success';
  const count = 5;
  log`Operation completed with ${status}. Total processed: ${count} items.`;
})();
