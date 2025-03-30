 

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { value: Math.random() * 100 } });
    }, 1000);
  });
};

const asyncProcessor = async () => {
  try {
    const response = await fetchData();
    return response.data.value;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const handler = {
  get: async (target, property) => {
    if (property in target) {
      const value = await asyncProcessor();
      print(`Fetched and processed value for ${property}:`, value);
      return target[property];
    }
    return undefined;
  },
};

const dataObject = { prop1: 42, prop2: 100 };
const proxyObject = new Proxy(dataObject, handler);

(async () => {
  print("Starting complex async operations...");
  print("Accessing prop1:", await proxyObject.prop1);
  print("Accessing prop2:", await proxyObject.prop2);
  print("Accessing prop3:", await proxyObject.prop3);  
})();
