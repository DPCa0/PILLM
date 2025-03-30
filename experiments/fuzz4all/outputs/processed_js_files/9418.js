 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const createLoggedObject = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      print(`Getting property ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  });
};

 
const user = createLoggedObject({ name: 'Alice', age: 25 });

 
async function* asyncGenerator(arr) {
  for (const item of arr) {
    await delay(1000);   
    yield item;
  }
}

 
(async () => {
  print('Starting process...');
  
  user.name = 'Bob';   
  print(user.name);   

  const numArray = [10, 20, 30, 40, 50];
  const asyncIter = asyncGenerator(numArray);

  for await (const num of asyncIter) {
    print(`Received number: ${num}`);
  }

  print('Process completed.');
})();
