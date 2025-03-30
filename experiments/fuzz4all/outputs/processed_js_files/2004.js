 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
};

 
async function processData(urls) {
  try {
    const results = await Promise.all(urls.map(url => fetchData(url)));
    return results.map(result => result.data.toUpperCase());
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
const dataHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing ${property}:`, target[property]);
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist.`);
      return null;
    }
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
async function main() {
  const dataUrls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const processedData = await processData(dataUrls);
  print('Processed Data:', processedData);

   
  const userData = {
    name: 'Alice',
    age: 30
  };

  const proxyUser = new Proxy(userData, dataHandler);
  print('User Name:', proxyUser.name);  
  proxyUser.name = 'Bob';  
  print('Updated User Name:', proxyUser.name);
}

main();
