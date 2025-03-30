 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, Math.random() * 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const trackedData = new Proxy({ name: 'Example' }, handler);

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
(async function main() {
  const urls = urlGenerator();
  let data;

   
  for (let url of urls) {
    data = await fetchData(url);
    print(data);
  }

   
  print(trackedData.name);
  trackedData.name = 'Updated Example';
  print(trackedData.name);
})();
