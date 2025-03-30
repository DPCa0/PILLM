(async () => {
   
  const handler = {
    get: (target, prop, receiver) => {
      if (prop === 'secret') return 'This is a secret!';
      return Reflect.get(...arguments);
    }
  };

  const targetObject = {
    regularProp: 'This is not a secret.'
  };

  const proxyObject = new Proxy(targetObject, handler);

   
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

   
  function* fibonacci() {
    let [prev, current] = [0, 1];
    while (true) {
      [prev, current] = [current, prev + current];
      yield current;
    }
  }

   
  const logExecution = (fn) => (...args) => {
    print(`Executing ${fn.name} with arguments: ${args}`);
    const result = fn(...args);
    print(`Result: ${result}`);
    return result;
  };

  const add = (a, b) => a + b;
  const loggedAdd = logExecution(add);

   
  const largeNumber = BigInt("123456789012345678901234567890");

   
  const user = {
    details: null
  };

  const userName = user.details?.name ?? 'Anonymous';

   
  print(proxyObject.secret);
  print(proxyObject.regularProp);
  const fib = fibonacci();
  print(fib.next().value);
  print(fib.next().value);
  loggedAdd(5, 3);
  print(`A large number: ${largeNumber}`);
  print(`User name: ${userName}`);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
