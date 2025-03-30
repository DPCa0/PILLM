 

 
(async () => {
  try {
     
    const { default: _ } = await import('https://cdn.skypack.dev/lodash');

     
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    };

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');

     
    const titles = _.map(data, 'title');

     
    const handler = {
      get: (target, prop) => {
        print(`Accessing property "${prop}"`);
        return target[prop];
      }
    };

    const proxyData = new Proxy(titles, handler);

     
    for (const title of proxyData) {
      print(title);
    }

     
    function* uniqueIterator(array) {
      const set = new Set(array);
      for (let item of set) {
        yield item;
      }
    }

     
    const [firstTitle = 'No Title'] = [...uniqueIterator(titles)];
    print(`First unique title: ${firstTitle}`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
