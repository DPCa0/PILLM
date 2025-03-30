 

const asyncTask = (value, delay) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
};

const advancedFunction = async () => {
  const symbolKey = Symbol('private');
  
  const handler = {
    get: function(target, prop, receiver) {
      if (prop === symbolKey) {
        return 'Access Denied';
      }
      return Reflect.get(target, prop, receiver);
    },
  };

  const proxiedObject = new Proxy({
    [symbolKey]: 'Sensitive Information',
    publicData: 'Public Info',
  }, handler);

  print(proxiedObject.publicData);  
  print(proxiedObject[symbolKey]);  

  try {
    print('Task started');
    const result = await asyncTask('Completed Async Task', 2000);
    print(result);  
  } catch (error) {
    console.error('Error:', error);
  }
};

advancedFunction();
