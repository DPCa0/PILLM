class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  load() {
    return Promise.all(this.resources.map(async resource => {
      const response = await fetch(resource);
      return response.json();
    }));
  }
}

const resources = [
  'https://api.example.com/resource1',
  'https://api.example.com/resource2'
];

const resourceLoader = new AsyncResourceLoader(resources);

(async () => {
  try {
    const data = await resourceLoader.load();
    const [res1, res2] = data;

     
    const handler = {
      get: (target, property) => {
        print(`Accessing property ${property}`);
        return target[property];
      }
    };

    const res1Proxy = new Proxy(res1, handler);
    const res2Proxy = new Proxy(res2, handler);

    print(res1Proxy.someProperty);
    print(res2Proxy.anotherProperty);

     
    print(`Resource 1 name: ${res1Proxy.name}, Resource 2 name: ${res2Proxy.name}`);

  } catch (error) {
    console.error('Failed to load resources', error);
  }
})();
