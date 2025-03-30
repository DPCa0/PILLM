(async function complexJS() {
   

   
  const fetchData = (url) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url) resolve({ data: `Fetched data from ${url}` });
        else reject('URL not provided');
      }, 1000);
    });

   
  const getData = async (url) => {
    try {
      const result = await fetchData(url);
      print(result.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

   
  const exampleMap = new Map();
  exampleMap.set('key1', 'value1');
  exampleMap.set('key2', 'value2');

  const exampleSet = new Set([1, 2, 3, 4]);

   
  const numbers = [5, 6, 7];
  const moreNumbers = [...numbers, 8, 9, 10];

  print('Map:', exampleMap);
  print('Set:', exampleSet);
  print('Numbers:', moreNumbers);

   
  const handler = {
    get: (target, prop, receiver) => {
      print(`Accessing property '${prop}'`);
      return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
      print(`Setting property '${prop}' to '${value}'`);
      return Reflect.set(target, prop, value, receiver);
    },
  };

  const obj = { a: 10 };
  const proxy = new Proxy(obj, handler);

  proxy.a;
  proxy.b = 20;

   
  await getData('https://example.com');

   
  const data = { user: { name: 'John Doe' } };
  print(data.user?.age ?? 'Age not provided');
})();
