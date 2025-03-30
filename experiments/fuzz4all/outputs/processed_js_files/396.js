 
const complexProgram = (() => {
   
  const fetchData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { message: "Hello, world!", status: 200 };
        Math.random() > 0.5 ? resolve(data) : reject("Fetch Error");
      }, 1000);
    });

   
  const processData = async () => {
    try {
      const response = await fetchData();
      print(response.message);
      return response;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

   
  const handler = {
    get: (target, prop) => {
      print(`Accessed property: "${prop}"`);
      return target[prop];
    },
    set: (target, prop, value) => {
      print(`Setting property "${prop}" to "${value}"`);
      target[prop] = value;
      return true;
    },
  };

  const proxyData = new Proxy({}, handler);

   
  processData()
    .then((data) => {
      proxyData.message = data.message;
      print("Proxy Data Message:", proxyData.message);
    })
    .catch((error) => {
      proxyData.error = error;
      console.error("Proxy Data Error:", proxyData.error);
    });
})();
