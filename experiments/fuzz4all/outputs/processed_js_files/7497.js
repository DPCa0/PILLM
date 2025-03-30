 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, world!');
    }, 1000);
  });
}

 
const handler = {
  get(target, property) {
    if (property in target) {
       
      print(`Getting property "${property}"`);
      return Reflect.get(target, property);
    } else {
      throw new Error(`Property "${property}" does not exist.`);
    }
  },
};

 
const target = {
  message: 'This is a proxied message!',
};

 
const proxy = new Proxy(target, handler);

 
(async () => {
  try {
     
    const message = await fetchData();
    print(message);

     
    print(proxy.message);

     
    print(proxy.nonExistentProperty);
  } catch (error) {
    console.error(error);
  }
})();
