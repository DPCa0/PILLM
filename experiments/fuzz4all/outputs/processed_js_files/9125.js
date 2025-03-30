 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { message: "Hello, world!" }, status: 200 });
    }, 1000);
  });
};

 
function* asyncGenerator() {
  print("Start fetching...");
  yield fetchData();
  print("Fetching completed.");
}

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting property: ${prop}`);
      return obj[prop];
    },
  });
};

(async () => {
   
  const gen = asyncGenerator();
  const { value: fetchPromise } = gen.next();

   
  try {
    const response = await fetchPromise;
    const proxiedData = createLoggingProxy(response.data);

    print(proxiedData.message);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    gen.next();  
  }
})();
