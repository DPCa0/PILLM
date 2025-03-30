 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const complexFunction = async () => {
  const data = [1, 2, 3, 4, 5];
  const doubledData = data.map(num => num * 2);
  
   
  const uniqueData = new Set([...doubledData, 8, 8, 10]);

   
  const setHandler = {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property ${prop}`);
        return target[prop];
      }
      return undefined;
    }
  };
  const proxiedSet = new Proxy(uniqueData, setHandler);

  print("Initial unique data:", [...proxiedSet]);

   
  await delay(2000);

   
  proxiedSet.add(12).add(14);

  print("Updated unique data:", [...proxiedSet]);

   
  const [first, second, ...rest] = [...proxiedSet];
  print(`Destructured elements: First: ${first}, Second: ${second}, Rest: ${rest}`);
};

complexFunction().catch(err => console.error(err));
