 
(async () => {
  const fetchModule = await import('node-fetch');
  const fetch = fetchModule.default;

   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        return `Property '${prop}' does not exist`;
      }
    }
  };

  const dataProxy = new Proxy({ existingProp: 'This exists!' }, handler);

  print(dataProxy.existingProp);   
  print(dataProxy.nonExistingProp);   

   
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();

     
    const { name, location, blog } = data;
    print(`Name: ${name ?? 'N/A'}`);
    print(`Location: ${location ?? 'N/A'}`);
    print(`Blog: ${blog ?? 'N/A'}`);
  } catch (error) {
    console.error(error.message);
  }

   
  const set1 = new Set([1, 2, 3]);
  const set2 = new Set([3, 4, 5]);
  const union = new Set([...set1, ...set2]);
  print('Union of sets:', [...union]);

   
  const urls = ['https://api.github.com', 'https://jsonplaceholder.typicode.com/posts'];
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));

  try {
    const results = await Promise.all(fetchPromises);
    const totalLength = results.reduce((acc, val) => acc + val.length, 0);
    print('Total length of fetched data:', totalLength);
  } catch (error) {
    console.error('Fetching error:', error);
  }
})();
