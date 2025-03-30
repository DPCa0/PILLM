 
(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
   
  function* range(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

   
  async function* asyncNumberStream() {
    for (const num of range(1, 10)) {
      await delay(500);  
      yield num;
    }
  }
  
   
  const handler = {
    set(target, property, value) {
      print(`Property '${property}' set to '${value}'`);
      return Reflect.set(target, property, value);
    }
  };

  let monitoredObject = new Proxy({}, handler);
  
  monitoredObject.name = 'Async Generator Demo';

  print('Starting number stream:');
  for await (const number of asyncNumberStream()) {
    print(number);
    if (number === 5) {
      monitoredObject.status = 'Midway';
    }
  }

  print('Number stream ended.');
  monitoredObject.status = 'Completed';
})().catch(console.error);
