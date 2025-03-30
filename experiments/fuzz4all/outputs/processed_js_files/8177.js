 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* dataGenerator() {
  yield fetchData('https://api.example.com/data1');
  yield fetchData('https://api.example.com/data2');
  yield fetchData('https://api.example.com/data3');
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property ${property}`);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist`);
      return undefined;
    }
  }
};

const dataProxy = new Proxy({ id: 1, name: 'Sample' }, handler);

 
async function main() {
  print(dataProxy.id);  
  print(dataProxy.nonExistentProp);  

  const generator = dataGenerator();
  for (let promise of generator) {
    const data = await promise;
    print(data);
  }
}

main().catch(console.error);
