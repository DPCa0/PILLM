 

const logHandler = {
  get: function(target, property) {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    } else {
      print(`Property ${property} not found`);
      return undefined;
    }
  },
  set: function(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = new Proxy({ num: 0 }, logHandler);

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ result: Math.random() }), 1000);
  });
}

(async function processData() {
  try {
    const symbol = Symbol('operation');
    data[symbol] = 'fetching data';
    print(`Operation status: ${data[symbol]}`);

    const result = await fetchData();
    data.num = result.result;
    
    print(`Final result: ${data.num}`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
