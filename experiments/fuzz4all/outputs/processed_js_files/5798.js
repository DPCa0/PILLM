 
(async () => {
  const fetchData = async url => {
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "https://api.example.com/data") {
          resolve({ id: 1, name: "Sample Data" });
        } else {
          reject("Invalid URL");
        }
      }, 1000);
    });
  };

  const dataHandler = {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      } else {
        print(`Property "${prop}" not found`);
        return null;
      }
    }
  };

  const processData = async () => {
    try {
      const data = await fetchData("https://api.example.com/data");
      const proxyData = new Proxy(data, dataHandler);

       
      const dataMap = new Map(Object.entries(proxyData));
      dataMap.set('category', 'Example');
      
       
      const uniqueValues = new Set([data.id, 'Sample', 'Example', 1]);
      
      print("Processed Data:", dataMap);
      print("Unique Values:", uniqueValues);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  await processData();
})();
