 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
  get(target, prop) {
    print(`Getting the value of ${prop}`);
    return prop in target ? target[prop] : 'Property does not exist';
  },
  set(target, prop, value) {
    print(`Setting the value of ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async function main() {
   
  const targetObject = {
    name: 'Advanced JS',
    type: 'Demo'
  };

   
  const proxy = new Proxy(targetObject, handler);

   
  print('Starting async operations...');
  await delay(1000);

  print('Current name:', proxy.name);
  await delay(500);
  
  proxy.name = 'Updated JS';
  await delay(500);
  
  print('Updated name:', proxy.name);
  
  print('Trying to access a non-existent property:', proxy.nonExistent);
  await delay(500);

  print('Async operations completed.');
})().catch(console.error);
