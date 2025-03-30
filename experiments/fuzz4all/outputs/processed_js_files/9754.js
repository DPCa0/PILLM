 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "Complex Data Structure" });
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  },
};

 
(async () => {
  try {
    const response = await fetchData();
    print("Data fetched:", response.data);

     
    const complexObject = {
      level1: {
        level2: {
          value: 42,
          func: () => "Hello from complex structure!",
        },
      },
    };

     
    const proxiedObject = new Proxy(complexObject, handler);

     
    const {
      level1: {
        level2: { value, func },
      },
    } = proxiedObject;

    print("Value extracted:", value);
    print("Function call result:", func());

     
    const newObj = { ...proxiedObject, newKey: `New value: ${value}` };
    print("New Object:", newObj);

     
    const gatherArgs = (...args) => args.reduce((acc, cur) => acc + cur, 0);
    print("Sum using rest parameters:", gatherArgs(1, 2, 3, 4));
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
