 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'John Doe', age: 30, occupation: 'Developer' });
    }, 1000);
  });
};

 
async function getUserData() {
  try {
    const user = await fetchData();
    return user;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting property '${property}'`);
    return property in target ? target[property] : 'Property does not exist';
  },
  set(target, property, value) {
    if (typeof value === 'string' && value.length > 0) {
      target[property] = value;
      print(`Setting property '${property}' to '${value}'`);
      return true;
    } else {
      console.error('Invalid value');
      return false;
    }
  },
};

(async () => {
  const user = await getUserData();
  
   
  const { name, ...rest } = user;
  print(`Name: ${name}`);
  
  const extendedUser = { ...rest, location: 'Remote', skills: ['JavaScript', 'React'] };
  
   
  const userProxy = new Proxy(extendedUser, handler);
  
   
  print(userProxy.name);  
  print(userProxy.skills);  

   
  userProxy.occupation = 'Full Stack Developer';
  userProxy.skills = 'Node.js';  
})();
