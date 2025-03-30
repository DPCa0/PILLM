 
import crypto from 'crypto';

 
async function generateUniqueId() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const targetObject = { message: "Hello World" };
const proxyObject = new Proxy(targetObject, handler);

 
(async function() {
   
  const uniqueId = await generateUniqueId();
  print(`Generated Unique ID: ${uniqueId}`);

   
  print(proxyObject.message);
  proxyObject.newProp = "A new property value";

   
  const newObject = { ...targetObject, uniqueId };
  print("New object:", newObject);

   
  print("Optional chaining:", proxyObject?.newProp ?? "default value");
})();
