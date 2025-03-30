 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const user = { id: 1, name: 'Alice', age: 30 };
const { name, ...rest } = user;

 
const dataMap = new Map();

 
const uniqueDataSet = new Set();

(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
   
  const dataPromises = urls.map(url => fetchData(url));
  const results = await Promise.all(dataPromises);

   
  results.forEach((data, index) => {
    dataMap.set(index + 1, data);
    uniqueDataSet.add(data);
  });

   
  const taggedTemplate = (strings, ...values) => strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
  print(taggedTemplate`Fetched ${uniqueDataSet.size} unique pieces of data for user ${name}`);

   
  print(`Data Map:`);
  dataMap.forEach((value, key) => {
    print(`ID: ${key}, Data: ${value}`);
  });

   
  const gen = idGenerator();
  print(`Generated IDs: ${gen.next().value}, ${gen.next().value}, ${gen.next().value}`);
})();
