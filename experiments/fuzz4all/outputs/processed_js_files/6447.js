 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property);
  }
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  
   
  const userData = await fetchData(url);
  
  if (userData) {
     
    const { name, email, address: { city } } = userData;

     
    const proxiedUser = new Proxy(userData, handler);
    
     
    print(`User Name: ${proxiedUser.name}`);
    print(`Email: ${proxiedUser.email}`);
    print(`City: ${proxiedUser.address.city}`);

     
    print(`Destructured - Name: ${name}, Email: ${email}, City: ${city}`);
  }
})();
