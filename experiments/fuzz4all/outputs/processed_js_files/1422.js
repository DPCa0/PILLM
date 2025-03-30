(async () => {
   

   
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve({
    user: { id: 1, name: 'Alice' },
    details: { age: 28, city: 'Wonderland' }
  }), 1000));

   
  const processData = async () => {
    try {
      const { user, details } = await fetchData();
      const { name, ...rest } = user;
      return { ...rest, ...details, greeting: `Hello, ${name}` };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  const main = async () => {
    const userInfo = await processData();
    print(JSON.stringify(userInfo, null, 2));
  };

   
  main();
})();
