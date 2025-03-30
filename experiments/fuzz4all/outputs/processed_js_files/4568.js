(async () => {
   
  const logger = obj => new Proxy(obj, {
    get(target, prop) {
      print(`Get property "${prop}"`);
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      print(`Set property "${prop}" to "${value}"`);
      return Reflect.set(target, prop, value);
    }
  });

  const data = logger({ x: 10, y: 20 });

   
  function* numberGenerator() {
    let num = 0;
    while (true) {
      yield num++;
    }
  }

  const numbers = numberGenerator();

   
  const asyncOperation = async () => {
    const fetchData = () => new Promise(resolve => setTimeout(() => resolve('Data fetched'), 1000));
    print(await fetchData());
  };

  await asyncOperation();

   
  const meta = new WeakMap();
  const element = { name: 'element' };
  meta.set(element, { created: Date.now() });

   
  const uniqueNumbers = new Set([1, 2, 3, 4, 3, 2, 1]);

   
  data.x = numbers.next().value;  
  print(`x: ${data.x}`);   
  print(`Metadata: `, meta.get(element));  
  print(`Unique Numbers: `, [...uniqueNumbers]);  
})();
