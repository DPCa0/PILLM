 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const arrayHandler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
async function asyncOperation() {
  print('Starting async operation');
  await delay(1000);
  print('Operation complete');
}

 
(async () => {
  try {
    const monitoredArray = new Proxy([], arrayHandler);

    monitoredArray.push(1);
    monitoredArray.push(2);
    print(monitoredArray[0]);
    
    await asyncOperation();

    if (monitoredArray.length !== 2) throw new CustomError('Array length mismatch');
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`Custom error: ${error.message}`);
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
  } finally {
    print('Process complete');
  }
})();
