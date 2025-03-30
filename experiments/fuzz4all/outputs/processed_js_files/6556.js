 
(async () => {
  const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const fakeData = { userId: 1, id: 1, title: "Sample Data" };
        url ? resolve(fakeData) : reject(new Error("Invalid URL"));
      }, 1000);
    });
  };

  const process = async (url) => {
    try {
      const { userId, title } = await fetchData(url);
      print(`User ID: ${userId}, Title: ${title.toUpperCase()}`);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

   
  const urls = ["https://jsonplaceholder.typicode.com/posts/1", null, "https://jsonplaceholder.typicode.com/posts/2"];
  const tasks = urls.map(url => process(url));

   
  const results = await Promise.allSettled(tasks);
  results.forEach(({ status, reason }, index) => {
    if (status === 'rejected') {
      console.warn(`URL ${index} failed: ${reason.message}`);
    }
  });

   
  const data = { a: 1, b: 2 };
  const handler = {
    get: (target, prop, receiver) => {
      print(`Property '${prop}' accessed`);
      return Reflect.get(target, prop, receiver);
    }
  };

  const proxyData = new Proxy(data, handler);
  print(proxyData.a);   

})();
