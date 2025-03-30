 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function* asyncGenerator(limit) {
  let count = 0;
  while (count < limit) {
    await delay(1000);  
    yield count++;
  }
}

 
class NumberSeries {
  static async generateSeries(limit) {
    const results = [];
    for await (const num of asyncGenerator(limit)) {
      results.push(num);
    }
    return results;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      print(`Property ${prop} does not exist, returning default.`);
      return () => 'default value';
    }
  }
};

 
const proxy = new Proxy(NumberSeries, handler);

 
(async () => {
  try {
    const series = await proxy.generateSeries(5);
    print('Generated series:', series);

     
    print('Non-existent property:', proxy.nonExistentMethod());
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
