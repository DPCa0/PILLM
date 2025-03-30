 
(async () => {
  try {
     
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

     
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();
    const processedData = data.map(({ id, title, body }) => ({
      id,
      title: title.toUpperCase(),
      summary: `${body.substring(0, 50)}...`
    }));

     
    const uniqueWords = new Set(
      processedData.flatMap(({ title }) => title.split(' '))
    );

     
    const handler = {
      get: (obj, prop) => {
        print(`Accessed property "${prop}"`);
        return obj[prop];
      }
    };

    const proxyData = new Proxy(processedData, handler);

     
    print('First Post:', proxyData[0]);

     
    function* idGenerator() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }

    const gen = idGenerator();
    print('Generated IDs:', gen.next().value, gen.next().value, gen.next().value);

     
    const metaDataMap = new WeakMap();
    processedData.forEach((post) => {
      metaDataMap.set(post, { processedDate: new Date() });
    });

    print('Post MetaData:', metaDataMap.get(processedData[0]));

  } catch (error) {
    console.error('Error:', error);
  }
})();
