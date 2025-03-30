 

(async () => {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Property '${prop.toString()}' accessed`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Property '${prop.toString()}' set to '${value}'`);
      return Reflect.set(target, prop, value, receiver);
    }
  };

   
  const targetObject = { greeting: 'Hello', place: 'world' };

   
  const proxy = new Proxy(targetObject, handler);

   
  async function getFullGreeting() {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    return `${proxy.greeting}, ${proxy.place}!`;
  }

   
  const greeting = await getFullGreeting();
  print(greeting);

   
  proxy.place = 'universe';
  const newGreeting = await getFullGreeting();
  print(newGreeting);
})();
