 
function delayedMessage(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

 
async function displayMessages() {
  try {
     
    const messages = await Promise.all([
      delayedMessage("Hello", 1000),
      delayedMessage("from", 2000),
      delayedMessage("an", 1500),
      delayedMessage("advanced", 2500),
      delayedMessage("JavaScript", 1000),
      delayedMessage("program!", 2000),
    ]);

     
    print(...messages);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(function run() {
  displayMessages();

   
  const target = { language: "JavaScript" };
  const handler = {
    get: (obj, prop) => {
      print(`Getting ${prop}:`, obj[prop]);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting ${prop} to`, value);
      obj[prop] = value;
      return true;
    },
  };
  const proxy = new Proxy(target, handler);

  proxy.language;  
  proxy.language = "TypeScript";  
})();
