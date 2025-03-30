(async () => {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting property: ${prop}`);
      return Reflect.get(...arguments);
    }
  };

  const target = { message: 'Hello, world!' };
  const proxy = new Proxy(target, handler);

   
  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  }

   
  const numbers = new Set([1, 2, 3, 3, 4, 5]);
  const squaredNumbers = [...numbers].map(x => x * x);

  print(`Squared Numbers: ${squaredNumbers}`);

   
  const urls = ['https://api.github.com', 'https://jsonplaceholder.typicode.com/posts'];
  try {
    const data = await Promise.all(urls.map(url => fetchData(url)));
    print(data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }

   
  const { message } = proxy;
  print(`Proxy Message: ${message}`);

   
  function multiply(factor, ...nums) {
    return nums.map(num => num * factor);
  }
  
  const result = multiply(2, 1, 2, 3, 4);
  print(`Multiplied Numbers: ${result}`);
})();
