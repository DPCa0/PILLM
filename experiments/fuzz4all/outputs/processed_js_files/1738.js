 

 
const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { 
        user: { 
          name: "John Doe", 
          age: 30, 
          location: { city: "New York", country: "USA" } 
        } 
      };
      if (url) {
        resolve(data);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
};

 
(async () => {
  try {
     
    const { user: { name, age, location: { city } } } = await fetchData('https://api.example.com/user');
    
     
    const userInfo = `Name: ${name}, Age: ${age}, City: ${city}`;
    
     
    const logUserInfo = (info) => print(info);

    logUserInfo(userInfo);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
