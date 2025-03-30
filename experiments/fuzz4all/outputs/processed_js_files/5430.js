 
const fetchDataAndProcess = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const processedData = data
      .filter(({ id }) => id % 2 === 0)  
      .map(({ id, title }) => ({ id, title: title.toUpperCase() }));  

     
    const uniqueTitles = new Set(processedData.map(item => item.title));

     
    const handler = {
      set(target, property, value) {
        print(`Property ${property} changed from ${target[property]} to ${value}`);
        target[property] = value;
        return true;
      }
    };

    const observedData = new Proxy(processedData, handler);

     
    observedData[0].title = "MODIFIED TITLE";

     
    function* dataGenerator(data) {
      for (const item of data) {
        yield item;
      }
    }

    const generator = dataGenerator(processedData);
    for (const item of generator) {
      print(item);
    }

     
    const idToTitleMap = new Map(processedData.map(item => [item.id, item.title]));

    print('Unique Titles:', [...uniqueTitles]);
    print('ID to Title Map:', idToTitleMap);

  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

fetchDataAndProcess();
