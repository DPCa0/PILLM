 
(async () => {
  const { default: fetch } = await import('node-fetch');

   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

   
  const processData = (data) => {
    const items = new Map();
    data.forEach(item => {
      if (!items.has(item.category)) items.set(item.category, []);
      items.get(item.category).push(item);
    });
    return items;
  };

   
  function* idGenerator() {
    let id = 1;
    while (true) yield id++;
  }
  const generateId = idGenerator();

   
  const handler = {
    set: (obj, prop, value) => {
      if (typeof value !== 'string') {
        throw new Error('Property values must be strings');
      }
      obj[prop] = value;
      return true;
    }
  };

  const guardedObject = new Proxy({}, handler);

  try {
    guardedObject.name = 'Alice';
     
     
  } catch (error) {
    console.error(error.message);
  }

   
  const html = (strings, ...values) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
  };

  const resultHTML = html`<div>${guardedObject.name}</div>`;

  print('Generated HTML:', resultHTML);

   
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  const categorizedData = processData(data);

  print('Categorized data:', categorizedData);

   
  print('Generated IDs:', generateId.next().value, generateId.next().value);
})();
