 

 

 
const fetchData = () => new Promise((resolve) =>
  setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000)
);

 
const processData = (...data) => {
  const squares = data.map(num => num ** 2);
  return squares;
};

 
const loggerHandler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

 
const dataObject = new Proxy({}, loggerHandler);

 
const main = async () => {
  try {
    const rawData = await fetchData();
    print('Fetched Data:', rawData);

     
    const processed = processData(...rawData);
    print('Processed Data:', processed);

     
    dataObject.results = processed;
    print('Logged Data:', dataObject.results);

  } catch (error) {
    console.error('Error:', error);
  }
};

 
main();
