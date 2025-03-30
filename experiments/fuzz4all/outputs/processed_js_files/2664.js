 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData() {
  const dataPoints = ['A', 'B', 'C', 'D'];
  for (const point of dataPoints) {
    await delay(1000);  
    yield point;
  }
}

 
const transformData = data => {
  return new Proxy(data, {
    get(target, prop, receiver) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(...arguments);
    },
    set(target, prop, value) {
      print(`Setting property: ${prop} to ${value}`);
      return Reflect.set(...arguments);
    }
  });
};

 
(async function main() {
  const transformedData = transformData({});
  
  print('Fetching data...');
  for await (const value of fetchData()) {
    transformedData[value] = value.charCodeAt(0);  
    print(`Data fetched and stored: ${value} -> ${transformedData[value]}`);
  }
  
  print('Transformed Data:', transformedData);
})();
