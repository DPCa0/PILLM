 
(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const dataHandler = {
    get(target, property) {
      print(`Getting value of ${property}`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting value of ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  };

  let data = { name: 'JavaScript', type: 'language' };
  const proxiedData = new Proxy(data, dataHandler);

   
  const dataMap = new Map();
  dataMap.set('data', proxiedData);

  const uniqueSet = new Set(['async', 'await', 'proxy']);
  uniqueSet.add('map');

   
  const { name, type } = proxiedData;
  print(`The data is about ${name}, which is a ${type}.`);

   
  const iterableObject = {
    [Symbol.iterator]: function* () {
      yield 'Item1';
      yield 'Item2';
      yield 'Item3';
    },
  };

  for (const item of iterableObject) {
    print(item);
  }

  try {
    const jsonData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched data: ${JSON.stringify(jsonData)}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
})();
