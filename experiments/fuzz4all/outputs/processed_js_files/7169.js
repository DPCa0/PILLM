(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const uniqueValues = (array) => [...new Set(array)];

   
  const logHandler = {
    get(target, property) {
      print(`Property ${property} was accessed`);
      return target[property];
    },
    set(target, property, value) {
      print(`Property ${property} was set to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const obj = new Proxy({ a: 1, b: 2 }, logHandler);

   
  if (Math.random() > 0.5) {
    const { sum } = await import('./mathUtils.js');
    print('Random choice used sum:', sum(2, 3));
  } else {
    print('Random choice did not use sum.');
  }

   
  function* fibonacciSequence() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  const fib = fibonacciSequence();
  print('Fibonacci sequence:', fib.next().value, fib.next().value, fib.next().value);

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');
    const names = data.map(user => user.name);
    const uniqueNames = uniqueValues(names);
    print('Unique user names:', uniqueNames);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
  
  obj.a = 42;
  print('Value of obj.a:', obj.a);
})();
