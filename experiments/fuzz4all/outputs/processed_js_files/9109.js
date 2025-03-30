 
async function* asyncGenerator(arr, delay) {
  for (const item of arr) {
    await new Promise(resolve => setTimeout(resolve, delay));
    yield item;
  }
}

 
async function processData(arr) {
   
  const handler = {
    set(target, property, value) {
      if (typeof value !== 'number') {
        throw new TypeError('Array values must be numbers');
      }
      return Reflect.set(target, property, value);
    }
  };

  const numericArray = new Proxy([], handler);

   
  for await (const num of asyncGenerator(arr, 500)) {
    try {
      numericArray.push(num);
      print(`Added ${num} to array:`, numericArray);
    } catch (e) {
      print(e.message);
    }
  }

   
  const squaredArray = await Promise.all(numericArray.map(async (num) => {
    return num * num;
  }));

  print('Squared array:', squaredArray);
}

 
processData([1, 2, 'a', 4, 5, 'hello']).catch(console.error);
