 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: { message: "Hello, world!", time: new Date().toISOString() }
      });
    }, 1000);
  });
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      print(`Property '${prop}' accessed.`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new Error(`Property '${prop}' does not exist.`);
    }
  }
};

 
async function processData() {
  try {
    const { data: { message, time }, status } = await fetchData('https://api.example.com');
    
    if (status === 200) {
      const proxyData = new Proxy({ message, time }, handler);

      print(proxyData.message);   
      print(proxyData.time);      
    }
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

processData();
