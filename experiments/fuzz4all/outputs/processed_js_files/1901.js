 

 
const privateDataSymbol = Symbol('privateData');

 
const handler = {
  get(target, property, receiver) {
    if (property === privateDataSymbol) {
      throw new Error('Access Denied');
    }
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property "${property}" to "${value}"`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const obj = new Proxy({
  [privateDataSymbol]: 'secret',
  publicData: 'accessible'
}, handler);

 
function* propertyGenerator(target) {
  for (const key of Reflect.ownKeys(target)) {
    yield { [key]: target[key] };
  }
}

 
async function accessProperties(target) {
  const properties = propertyGenerator(target);
  
  for (const prop of properties) {
    print('Yielded property:', prop);
    await new Promise(resolve => setTimeout(resolve, 1000));  
  }
}

(async function main() {
  try {
    print('Initial Public Data:', obj.publicData);
    obj.publicData = 'updated';

     
    print('Private Data:', obj[privateDataSymbol]);
  } catch (error) {
    console.error('Error:', error.message);
  }

   
  await accessProperties(obj);
})();
