 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const handler = {
    get: function(target, prop) {
      return prop in target ? target[prop] : 'Not Found';
    }
  };

  const data = { name: 'JavaScript', type: 'Programming Language' };
  const proxyData = new Proxy(data, handler);

   
  function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

  const fib = fibonacci();

   
  async function getData() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
      print('Fetched Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  const uniqueNumbers = new Set([1, 2, 2, 3, 4, 4, 5]);
  uniqueNumbers.add(6);

   
  print(`Proxy Access: Name - ${proxyData.name}, Description - ${proxyData.description}`);
  print(`First 5 Fibonacci numbers: ${[...Array(5)].map(() => fib.next().value).join(', ')}`);
  print(`Unique Numbers: ${[...uniqueNumbers].join(', ')}`);

   
  getData();
})();
