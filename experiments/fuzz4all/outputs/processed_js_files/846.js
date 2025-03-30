 

 
function* fetchData() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function process() {
  const iterator = fetchData();

  for (let promise of iterator) {
    const data = await promise;
    print('Processed:', data);
  }
}

 
const target = {
  data: [],
  log: function () {
    print('Logging:', this.data);
  }
};

 
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : `Property '${prop}' does not exist`;
  },
  set: function (obj, prop, value) {
    if (typeof value === 'string') {
      obj[prop] = value.toUpperCase();
    } else {
      obj[prop] = value;
    }
    return true;
  }
};

const proxy = new Proxy(target, handler);

(async function main() {
   
  proxy.data = await process();
  proxy.extra = 'some extra data';  

   
  proxy.log();

  print(proxy.nonexistentProperty);
})();
