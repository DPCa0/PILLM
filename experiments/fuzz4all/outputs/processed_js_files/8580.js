 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'Alice', age: 30, city: 'Wonderland' };
      resolve({ status: 200, data });
    }, 1000);
  });
};

 
const handler = {
  get(target, property) {
    return property in target ? target[property] : `No property named ${property}`;
  },
};

(async () => {
  try {
    const response = await fetchData('https://example.com/api/user');
    if (response.status === 200) {
      let { data } = response;
       
      const userDetails = { ...data, country: 'Fantasy Land' };
      
       
      const proxyUser = new Proxy(userDetails, handler);

      print(`Name: ${proxyUser.name}`);
      print(`Age: ${proxyUser.age}`);
      print(`City: ${proxyUser.city}`);
      print(`Country: ${proxyUser.country}`);
      print(`Job: ${proxyUser.job}`);  
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
