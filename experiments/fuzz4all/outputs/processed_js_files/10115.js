 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const reactive = obj => {
  const handler = {
    get(target, prop, receiver) {
      print(`Accessed property "${prop}" with value: ${Reflect.get(...arguments)}`);
      return Reflect.get(...arguments);
    },
    set(target, prop, value) {
      print(`Setting property "${prop}" to value: ${value}`);
      return Reflect.set(...arguments);
    }
  };
  return new Proxy(obj, handler);
};

 
const fetchData = async url => {
  print(`Fetching data from ${url}...`);
  await delay(1000);  
  print(`Data fetched from ${url}`);
  return { data: `Data from ${url}` };
};

 
(async () => {
  const data = reactive(await fetchData('https://example.com/api'));

  print(data.data);  

   
  const { default: _ } = await import('lodash');
  const transformedData = _.toUpper(data.data);

  print(`Transformed Data: ${transformedData}`);
})();
