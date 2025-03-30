 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function main() {
   
  let handler = {
    get(target, property) {
      if (property === 'push') {
        return (...args) => {
          print(`Adding elements: ${args}`);
          return Array.prototype.push.apply(target, args);
        };
      }
      return Reflect.get(target, property);
    }
  };

  let observedArray = new Proxy([], handler);

   
  const magicSymbol = Symbol('magicFunction');

  class Magic {
    [magicSymbol]() {
      print('Magic happens here!');
    }
  }

   
  async function* asyncGenerator() {
    for (let i = 1; i <= 3; i++) {
      await delay(1000);  
      yield i;
    }
  }

   
  const magician = new Magic();
  magician[magicSymbol]();

   
  for await (const num of asyncGenerator()) {
    print(`Async number: ${num}`);
    observedArray.push(num);
  }

  print('Final Observed Array:', observedArray);
}

 
main().catch(console.error);
