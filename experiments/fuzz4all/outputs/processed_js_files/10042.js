 
(async function complexFunction() {
   
  const fetchData = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(['John', 'Jane', 'Doe', 'Smith']), 1000)
    );

   
  const data = await fetchData();

   
  const [firstName, secondName, ...others] = data;

   
  function createCounter() {
    let count = 0;
    return function incrementCounter() {
      count += 1;
      return count;
    };
  }

  const counter = createCounter();

   
  (() => {
    const nameMap = new Map();

     
    data.forEach((name, index) => nameMap.set(index, name));

     
    function* generatorFunction() {
      for (let [key, value] of nameMap) {
        yield `${key}: ${value}`;
      }
    }

     
    for (const entry of generatorFunction()) {
      print(entry);
    }
  })();

  print(`Hello, ${firstName} and ${secondName}`);
  print(`Other names: ${others.join(', ')}`);
  print(`Counter value: ${counter()}`);  
})();
