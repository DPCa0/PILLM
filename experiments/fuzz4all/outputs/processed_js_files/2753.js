 
(async () => {
  try {
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');
    
     
    const reactiveHandler = {
      set(target, property, value) {
        print(`Setting value ${value} to ${property}`);
        target[property] = value;
        if (target._callback) target._callback(target);
        return true;
      }
    };
    
    const data = new Proxy({ count: 0 }, reactiveHandler);
    
     
    function* countGenerator() {
      while (true) yield ++data.count;
    }
    
    const counter = countGenerator();
    
     
    data._callback = function (state) {
      print(`Current state:`, _.cloneDeep(state));
    };
    
     
    async function updateState() {
      for await (let num of [1, 2, 3, 4, 5]) {
        data.count = counter.next().value;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
     
    updateState();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
