 
const myModule = (() => {
   
  let secret = "I'm a secret";

   
  function privateMethod() {
    print(`Accessed private method: ${secret}`);
  }

   
  return {
    publicMethod: function() {
      print("This is a public method.");
      privateMethod();
    },
    setSecret: function(newSecret) {
      secret = newSecret;
    }
  };
})();

 
async function advancedFeaturesDemo() {
   
  const promiseMap = new Map();

   
  const resultSet = new Set();

   
  const values = [1, 2, 2, 3, 4, 5];

   
  values.forEach(value => {
    const promise = new Promise((resolve) => {
      setTimeout(() => resolve(value * 2), 1000 * Math.random());
    });
    promiseMap.set(value, promise);
  });

   
  for (let [key, promise] of promiseMap) {
    const result = await promise;
    resultSet.add(result);
  }

   
  const resultArray = [...resultSet];
  print("Unique results: ", resultArray);
  
   
  const [first, ...rest] = resultArray;
  print("First result: ", first);
  print("Rest results: ", rest);
}

 
myModule.publicMethod();
myModule.setSecret("New Secret");
myModule.publicMethod();

 
advancedFeaturesDemo();
