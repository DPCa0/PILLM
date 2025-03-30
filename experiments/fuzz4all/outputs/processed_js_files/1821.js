 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'Alice',
          age: 30,
          hobbies: ['reading', 'hiking', 'coding']
        },
        location: 'Wonderland'
      });
    }, 1000);
  });
}

 
const loggerHandler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  }
};

 
async function main() {
  const data = await fetchData();
  
   
  const { user: { name, hobbies }, location } = data;
  
   
  const userWithLogging = new Proxy({ name, hobbies }, loggerHandler);

  print(`User ${userWithLogging.name} from ${location} enjoys:`);
  userWithLogging.hobbies.forEach(hobby => print(hobby));
}

main();
