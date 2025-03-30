 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

     
    const transformedData = data.map(({ id, title, body }) => ({
      id,
      title: title.toUpperCase(),
      summary: body.slice(0, 50)
    }));

     
    const uniqueIds = new Set(transformedData.map(item => item.id));

     
    function* uniqueDataGenerator(items) {
      for (let item of items) {
        if (uniqueIds.has(item.id)) {
          yield item;
          uniqueIds.delete(item.id);
        }
      }
    }

     
    const uniqueDataIterable = uniqueDataGenerator(transformedData);

     
    const handler = {
      get(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
      }
    };

     
    for (const item of uniqueDataIterable) {
      const proxiedItem = new Proxy(item, handler);
      print(`Title: ${proxiedItem.title}, Summary: ${proxiedItem.summary}`);
    }
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
};

 
fetchData('https://jsonplaceholder.typicode.com/posts');
