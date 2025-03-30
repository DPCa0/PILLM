 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
}

 
function* dataGenerator(data) {
  for (const item of data) {
    yield item;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Property '${property}' set to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async function main() {
  try {
    const url = "https://example.com/api";
    const data = await fetchData(url);
    
    print('Fetched Data:', data);
    
    const dataArray = ['Item 1', 'Item 2', 'Item 3'];
    const dataGen = dataGenerator(dataArray);
    
    print('Generated Data:', dataGen.next().value);
    print('Generated Data:', dataGen.next().value);
    
    const dataObject = { id: 1, content: "Hello Proxy" };
    const proxyData = new Proxy(dataObject, handler);
    
    print('Proxy Data:', proxyData.content);
    proxyData.content = "Updated Proxy Content";
    print('Updated Proxy Data:', proxyData.content);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
