 

 
const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `Item ${id}`, value: Math.random() * 100 });
    }, 1000);
  });
};

 
async function* dataGenerator(count) {
  for (let i = 1; i <= count; i++) {
    yield await fetchData(i);
  }
}

 
const processData = async (count) => {
  const result = [];
  for await (const { id, name, value } of dataGenerator(count)) {
    result.push({ id, name, value: value.toFixed(2) });
  }
  return result;
};

 
const dataValidator = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) {
        return obj[prop];
      } else {
        throw new Error(`Property "${prop}" does not exist.`);
      }
    },
  });
};

 
(async () => {
  try {
    const data = await processData(5);
    const safeData = dataValidator(data);

     
    print(safeData[0]);  
    print(safeData[5]);  
  } catch (error) {
    console.error(error.message);
  }
})();
