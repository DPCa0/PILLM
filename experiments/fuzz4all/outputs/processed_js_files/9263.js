 

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${String(prop)}`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${String(prop)}" does not exist.`);
    }
  },
  set(target, prop, value) {
    print(`Setting property: ${String(prop)} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {};

 
const secret = Symbol('secret');
targetObject[secret] = 'hidden value';

const proxiedObject = new Proxy(targetObject, handler);

 
async function manipulateObject() {
  try {
    proxiedObject.a = 42;
    
    const readValue = await new Promise((resolve) => {
      setTimeout(() => resolve(proxiedObject.a), 1000);
    });
    
    print(`Value of 'a': ${readValue}`);
    
     
    const secretValue = await new Promise((resolve) => {
      setTimeout(() => resolve(proxiedObject[secret]), 1000);
    });
    
    print(`Secret value: ${secretValue}`);
    
     
    await new Promise((_, reject) => {
      setTimeout(() => reject(proxiedObject.nonExistent), 1000);
    });
  } catch (error) {
    console.error(error);
  }
}

manipulateObject();
