 
(async function complexExample() {
  try {
     
    const { log: print } = console;

     
    const handler = {
      get: (target, prop) => {
        if (prop === 'name') return 'Advanced JavaScript';
        return Reflect.get(target, prop);
      }
    };
    const obj = new Proxy({ name: 'JS' }, handler);

     
    const fetchData = async (url) => {
       
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

     
    async function* asyncGenerator() {
      yield fetchData('https://jsonplaceholder.typicode.com/todos/1');
      yield fetchData('https://jsonplaceholder.typicode.com/todos/2');
    }

    const result = [];
    for await (const data of asyncGenerator()) {
      result.push(data);
    }

     
    const uniqueItems = new Set(result.map(item => item.title));

     
    const [firstTitle, ...otherTitles] = [...uniqueItems];
    print(`Object Proxy Name: ${obj.name}`);
    print(`First Title: ${firstTitle}`);
    print(`Other Titles: ${otherTitles.join(', ')}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
