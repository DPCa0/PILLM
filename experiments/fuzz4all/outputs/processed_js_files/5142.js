 

 
const SECRET = Symbol('secret');

 
const targetObject = {
  name: "JavaScript Enthusiast",
  [SECRET]: "This is a hidden message"
};

const handler = {
  get(target, prop, receiver) {
    print(`Property '${String(prop)}' has been accessed`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Property '${String(prop)}' has been set to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
async function revealSecret() {
  print(`Hello, ${proxyObject.name}`);

   
  const secretMessage = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(proxyObject[SECRET]);
    }, 1000);
  });

  print(`The secret message is: ${secretMessage}`);
}

 
(async () => {
  try {
    await revealSecret();
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
})();

 
proxyObject.name = "Advanced JS Developer";
print(`Updated name: ${proxyObject.name}`);
