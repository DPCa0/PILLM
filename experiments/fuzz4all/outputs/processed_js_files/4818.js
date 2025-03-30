 

class AdvancedArray extends Array {
   
  static create(...args) {
    return new Proxy(new AdvancedArray(...args), {
      get(target, prop, receiver) {
        if (prop === 'length') {
          print(`Length accessed: ${target.length}`);
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        if (typeof prop === 'string' && !isNaN(prop)) {
          print(`Setting index ${prop} to value ${value}`);
        }
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }
  
  average() {
    return this.reduce((acc, num) => acc + num, 0) / this.length;
  }
}

const asyncProcess = async (arr) => {
  print('Starting async processing...');
  await new Promise(res => setTimeout(res, 1000));  
  print('Original Array:', arr);
  print('Average:', arr.average());
};

const runAsync = async (func, ...args) => {
  try {
    await func(...args);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const monitoredArray = AdvancedArray.create(1, 2, 3, 4, 5);

 
monitoredArray.push(6);
runAsync(asyncProcess, monitoredArray);

print('End of script');
