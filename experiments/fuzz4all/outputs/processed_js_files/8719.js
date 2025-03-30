 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const createDataProxy = (initialData) => {
  return new Proxy(initialData, {
    get(target, prop, receiver) {
      if (prop in target) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
      } else {
        console.warn(`Property ${prop} does not exist`);
      }
    },
    set(target, prop, value) {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    }
  });
};

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetchedData = await fetchData(url);

    const dataProxy = createDataProxy(fetchedData);
    const dataIter = dataGenerator(dataProxy);

     
    dataProxy[0].title = 'Updated Title';

     
    let item;
    while (!(item = dataIter.next()).done) {
      print(item.value);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
