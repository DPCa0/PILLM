 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
const createDataHandler = (data) => {
  return new Proxy(data, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing index ${prop}: ${target[prop]}`);
        return target[prop];
      }
      print(`Property ${prop} not found`);
      return undefined;
    },
  });
};

 
(async () => {
  try {
     
    let [first, ...rest] = await fetchData();

     
    const taggedTemplate = (strings, ...values) =>
      strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');

    print(taggedTemplate`Fetched fruit: ${first}`);
    
     
    const handler = createDataHandler(rest);
    handler[0];  
    
     
    const modifiedData = [...rest, 'dragonfruit'];
    print(taggedTemplate`Modified data includes: ${modifiedData.join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
