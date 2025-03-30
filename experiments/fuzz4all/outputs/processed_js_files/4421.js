 

const complexOperation = async () => {
   
  const userPreferences = new Map([
    ['theme', 'dark'],
    ['fontSize', 16],
  ]);

   
  const activeSessions = new WeakSet();
  let session = { id: 1 };
  activeSessions.add(session);

   
  const simulateAsyncTask = (task) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        task === 'fetchData' ? resolve('Data fetched') : reject('Task failed');
      }, 1000);
    });
  };

   
  const proxyHandler = {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Updated property: ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  };

  const proxiedPreferences = new Proxy(userPreferences, proxyHandler);

  try {
    const result = await simulateAsyncTask('fetchData');
    print(result);

     
    print(`Theme: ${proxiedPreferences.get('theme')}`);
    proxiedPreferences.set('fontSize', 18);

     
    if (activeSessions.has(session)) {
      print('Session is active');
    }
  } catch (error) {
    console.error(error);
  }
};

complexOperation();
