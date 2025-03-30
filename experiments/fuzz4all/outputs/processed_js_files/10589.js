 
(async () => {
   
  const { format } = await import('date-fns');

   
  const currentDate = format(new Date(), 'yyyy-MM-dd');

   
  const targetObject = {
    name: 'JavaScript',
    version: 'ES2023',
  };

  const handler = {
    get(target, prop, receiver) {
      print(`Getting property: ${String(prop)}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property: ${String(prop)} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    },
  };

  const proxy = new Proxy(targetObject, handler);
  print(proxy.name);  
  proxy.version = 'ESNext';  

   
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  }

   
  fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const numbers = [1, 2, 3, 4, 5, 6];
  const lastEvenNumber = numbers.findLast((num) => num % 2 === 0);
  const lastEvenIndex = numbers.findLastIndex((num) => num % 2 === 0);

  print('Last Even Number:', lastEvenNumber);  
  print('Last Even Index:', lastEvenIndex);  

   
  print('Current Date:', currentDate);
})();
