 
(async () => {
   
  const [dateFns, _] = await Promise.all([
    import('https://cdn.skypack.dev/date-fns'),
    new Promise(resolve => setTimeout(resolve, 1000)),  
  ]);

   
  const user = { name: 'Alice', age: 25 };
  const proxyUser = new Proxy(user, {
    get(target, prop) {
      print(`Getting property ${String(prop)}`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property ${String(prop)} to ${value}`);
      target[prop] = value;
      return true;
    }
  });

   
  print(`User's age is ${proxyUser.age ?? 'unknown'}`);
  proxyUser.contact?.email ??= 'No email provided';

  // Logging formatted current date using imported module
  const now = new Date();
  print(`Current date is: ${dateFns.format(now, 'yyyy-MM-dd')}`);

   
  function* numberGenerator() {
    let num = 0;
    while (true) yield num++;
  }

  const numbers = numberGenerator();
  print(numbers.next().value);
  print(numbers.next().value);

   
  const arr = [1, 2, 3];
  const newArr = [...arr, 4, 5];
  print(newArr);

  const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
  print(sum(...newArr));
})();
