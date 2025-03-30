 

 
const myModule = (() => {
   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve('Hello, world!'), 1000);
  });

   
  const asyncGreeting = async () => {
    try {
      const message = await fetchData();
      print(message);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  return {
    asyncGreeting,
  };
})();

 
const { asyncGreeting } = myModule;

 
asyncGreeting();
