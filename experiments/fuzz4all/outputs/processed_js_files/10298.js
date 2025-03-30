 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchUserData(userId) {
  await delay(1000);  
  return {
    id: userId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: { city: 'New York', zip: '10001' }
  };
}

 
const loggingHandler = {
  get(target, property, receiver) {
    print(`Property '${property}' was accessed.`);
    return Reflect.get(target, property, receiver);
  }
};

 
(async function main() {
  const userId = 123;
  
   
  const userData = await fetchUserData(userId);
  
   
  const { name, email, address: { city } } = userData;
  
   
  const proxiedUserData = new Proxy(userData, loggingHandler);
  
   
  print(`User Info: Name - ${proxiedUserData.name}, Email - ${proxiedUserData.email}`);
  print(`Lives in: ${proxiedUserData.address.city}`);

   
  const userCity = proxiedUserData.address.city;
})().catch(console.error);
