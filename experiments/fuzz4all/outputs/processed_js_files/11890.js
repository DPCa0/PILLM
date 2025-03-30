 

function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const proxyHandler = {
  get: function(target, prop) {
    if (prop === 'nextId') {
      return target.generator.next().value;
    }
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} does not exist`;
    }
  }
};

class Resource {
  constructor(name) {
    this.name = name;
    this.generator = idGenerator();
  }

  async fetchResource() {
    const id = this.nextId;
    const simulatedFetchTime = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, simulatedFetchTime));
    return { id, name: this.name, status: 'fetched' };
  }
}

const resourceProxy = new Proxy(new Resource('MyResource'), proxyHandler);

(async function manageResources() {
  print('Fetching resources asynchronously...');
  const resources = await Promise.all([
    resourceProxy.fetchResource(),
    resourceProxy.fetchResource(),
    resourceProxy.fetchResource()
  ]);
  resources.forEach(resource => {
    print(`Resource fetched: ID = ${resource.id}, Name = ${resource.name}, Status = ${resource.status}`);
  });
})();
