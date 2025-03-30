 

(async () => {
   
  const handler = {
    get: (target, prop) => {
      print(`Property '${prop}' accessed`);
      return target[prop];
    },
  };

  const data = new Proxy({ greeting: "Hello", target: "World" }, handler);

   
  const fetchData = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Greetings from ${data.greeting}, ${data.target}!`);
      }, 1000);
    });

   
  const showMessage = async () => {
    try {
      const message = await fetchData();
      print(message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

   
  await showMessage();
})();
