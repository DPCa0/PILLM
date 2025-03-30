 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Hello from " + url };
      resolve(data);
    }, 1000);
  });
};

 
const getData = async () => {
  try {
    const urls = ["siteA.com", "siteB.com", "siteC.com"];
    const results = await Promise.all(urls.map(url => fetchData(url)));

     
    const [{ message: messageA }, { message: messageB }, { message: messageC }] = results;

     
    print(`Responses:\n- ${messageA}\n- ${messageB}\n- ${messageC}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property "${prop}" accessed.`);
    return Reflect.get(target, prop, receiver);
  }
};

const targetObject = { data: 'Important data' };
const proxy = new Proxy(targetObject, handler);

getData();   
print(proxy.data);   
