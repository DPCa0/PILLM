 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ status: 200, data: { name: "John Doe", age: 30, job: "Developer" } });
      } else {
        reject({ status: 404, message: "Not Found" });
      }
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  yield `Name: ${data.name}`;
  yield `Age: ${data.age}`;
  yield `Job: ${data.job}`;
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(...arguments);
  }
};

 
(async () => {
  try {
    const response = await fetchData("https://api.example.com/data");

    if (response.status === 200) {
       
      const { name, age, job } = response.data;

       
      const proxyData = new Proxy({ name, age, job }, handler);

       
      const processor = dataProcessor(proxyData);
      for (let info of processor) {
        print(info);
      }
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
