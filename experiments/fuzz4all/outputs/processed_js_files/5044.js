 
const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve({ data: `Data from ${url}` }) : reject("No URL provided");
    }, 1000);
  });
};

 
const createLogger = () => {
  return new Proxy(console, {
    get: (target, prop) => {
      if (prop === 'log') {
        return (...args) => {
          const timestamp = new Date().toISOString();
          target.log(`[${timestamp}]`, ...args);
        };
      }
      return target[prop];
    }
  });
};

const logger = createLogger();

const processData = async (url) => {
  try {
    logger.log("Fetching data...");
    const response = await fetchData(url);
    logger.log("Data received:", response.data);

     
    const processedData = response.data.toUpperCase();
    logger.log("Processed Data:", processedData);
    return processedData;
  } catch (error) {
    logger.error("Error occurred:", error);
  }
};

 
(async () => {
  const url = "https://api.example.com/resource";
  const result = await processData(url);
  if (result) {
    logger.log("Final Result:", result);
  }
})();
