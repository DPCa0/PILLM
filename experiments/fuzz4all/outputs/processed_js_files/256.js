 
(async () => {
  const { promises: fs } = await import('fs');

   
  const loggerHandler = {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property: ${prop}`);
        return target[prop];
      } else {
        print(`Property ${prop} does not exist`);
      }
    }
  };

   
  const targetObject = {
    message: 'Hello, World!',
    showMessage() {
      print(this.message);
    }
  };

  const proxyObject = new Proxy(targetObject, loggerHandler);

   
  async function fetchData() {
    try {
      const response = await fetch('https://api.github.com');
      const data = await response.json();
      print('GitHub API Status:', data);

       
      await fs.writeFile('github_api_data.json', JSON.stringify(data, null, 2));
      print('Data written to file');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  await Promise.all([
    fetchData(),
    (async () => proxyObject.showMessage())()
  ]);

   
  function* objectIterator(obj) {
    const keys = Reflect.ownKeys(obj);
    for (const key of keys) {
      yield [key, obj[key]];
    }
  }

   
  for (let [key, value] of objectIterator(proxyObject)) {
    print(`${key}: ${value}`);
  }
})();
