class AsyncResource {
  constructor(name) {
    this.name = name;
  }
  
  async fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Data from ${this.name}`);
      }, Math.random() * 1000);
    });
  }
}

 
function mergeAndLogData(...resources) {
  Promise.all(resources.map(resource => resource.fetchData()))
    .then(dataArray => {
      const [firstData, ...restData] = dataArray;
      const mergedData = [firstData, ...restData];
      print('Merged Data:', mergedData);
    });
}

 
const resourceHandler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    }
    return undefined;
  }
};

 
const resources = [
  new Proxy(new AsyncResource('Resource1'), resourceHandler),
  new Proxy(new AsyncResource('Resource2'), resourceHandler),
  new Proxy(new AsyncResource('Resource3'), resourceHandler)
];

mergeAndLogData(...resources);
