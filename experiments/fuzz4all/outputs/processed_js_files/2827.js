 

(async () => {
   
  const fetchData = () => new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'John Doe', age: 30, address: { city: 'New York', country: 'USA' } });
    }, 1000);
  });

  try {
     
    const { name, age, address: { city, country } } = await fetchData();

     
    print(`Name: ${name}, Age: ${age}`);
    print(`City: ${city}, Country: ${country}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
