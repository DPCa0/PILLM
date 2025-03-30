 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

async function dynamicImport(modulePath) {
  try {
    const module = await import(modulePath);
    module.sayHello();
  } catch (error) {
    console.error("Error loading module:", error);
  }
}

const dataHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `Property ${property} does not exist`;
  }
};

(async () => {
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  
  try {
    const data = await fetchData(dataUrl);
    const proxyData = new Proxy(data, dataHandler);

    print('Title:', proxyData.title);
    print('NonExistent:', proxyData.nonExistent);

    await dynamicImport('./dynamicModule.js');  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
