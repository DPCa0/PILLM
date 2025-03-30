(async () => {
   
  const fetchData = async (url) => {
    const delay = Math.floor(Math.random() * 2000);
    await new Promise(resolve => setTimeout(resolve, delay));
    return `Data from ${url} (fetched in ${delay} ms)`;
  };

  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
  
  try {
    const data = await Promise.all(urls.map(url => fetchData(url)));
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const createValidatedObject = (target) => {
    return new Proxy(target, {
      set(obj, prop, value) {
        if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
          throw new Error('Invalid age value');
        }
        obj[prop] = value;
        return true;
      }
    });
  };

  const person = createValidatedObject({ name: 'Alice', age: 25 });
  print('Initial person:', person);

  try {
    person.age = -5;
  } catch (e) {
    console.error('Caught Error:', e.message);
  }

  person.age = 30;
  print('Updated person:', person);

   
  function* fibonacci(limit) {
    let a = 0, b = 1;
    while (limit-- > 0) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  print('Fibonacci Sequence:');
  for (const num of fibonacci(10)) {
    print(num);
  }
})();
