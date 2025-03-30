class AdvancedArray extends Array {
  constructor(...args) {
    super(...args);
  }

  unique() {
    return [...new Set(this)];
  }

  async mapAsync(callback) {
    return Promise.all(this.map(callback));
  }
}

 
const complexFunction = async () => {
  const data = new AdvancedArray(1, 2, 2, 3, 4, 5, 5);

   
  const uniqueData = data.unique();
  print('Unique Data:', uniqueData);

   
  const asyncMapped = await data.mapAsync(async (num) => {
    await new Promise(resolve => setTimeout(resolve, 100));  
    return num * 2;
  });
  print('Async Mapped:', asyncMapped);

   
  function* generateSquares(arr) {
    for (let num of arr) {
      yield num * num;
    }
  }

  const squares = generateSquares(uniqueData);
  print('Squares:', [...squares]);

   
  const handler = {
    get: function(target, prop, receiver) {
      if (prop in target) {
        return target[prop];
      } else {
        return `Property '${prop}' not found`;
      }
    }
  };

  const proxyData = new Proxy(data, handler);

  print('Proxy Access:', proxyData[3]);   
  print('Proxy Access:', proxyData[10]);  
};

complexFunction();
