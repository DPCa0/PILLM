 
(async () => {
   
  const targetObject = {
    name: "Advanced JS",
    level: 42
  };

  const handler = {
    get: (target, prop, receiver) => {
      if (prop === 'level') {
        return `Level is top secret`;
      }
      return Reflect.get(...arguments);
    }
  };

  const proxyObject = new Proxy(targetObject, handler);

   
  const asyncFunction = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Operation Complete");
      }, 1000);
    });
  };

  print(`Name: ${proxyObject.name}`);  
  print(`Level: ${proxyObject.level}`);  

   
  const numbers = [1, 2, 3, 4, 5];
  const squared = numbers.map(num => num * num).filter(num => num > 10);
  const sum = squared.reduce((acc, num) => acc + num, 0);

  print(`Squared Numbers > 10: ${squared}`);
  print(`Sum of Squared Numbers > 10: ${sum}`);

   
  const mySet = new Set([1, 1, 2, 2, 3, 3]);
  print(`Unique Set: ${Array.from(mySet)}`);

   
  const myMap = new Map();
  myMap.set('a', 1);
  myMap.set('b', 2);
  myMap.forEach((value, key) => {
    print(`Key: ${key}, Value: ${value}`);
  });

   
  function tag(strings, ...values) {
    return strings.raw[0] + values.map((v, i) => v + strings.raw[i + 1]).join('');
  }

  const rawOutput = tag`Hello\nWorld! Level is: ${proxyObject.level}`;
  print(rawOutput);

   
  const sym1 = Symbol('foo');