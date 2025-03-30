 

 
const fetchData = () => new Promise(resolve => {
  setTimeout(() => resolve({id: 1, name: 'John Doe', email: 'john.doe@example.com'}), 1000);
});

 
async function getUserData() {
  const {id, name, email} = await fetchData();  
  return {id, name, email, role: 'User'};  
}

 
const userHandler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return property in target ? target[property] : `Property ${property} not found`;
  }
};

(async () => {
  const userData = await getUserData();
  const userProxy = new Proxy(userData, userHandler);

  print(userProxy.name);    
                                  
  print(userProxy.email);   
                                  
  print(userProxy.age);     
                                  
})();
