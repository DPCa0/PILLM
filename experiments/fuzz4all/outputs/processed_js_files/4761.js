 
(async () => {
  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Alice', age: 28 },
          { id: 2, name: 'Bob', age: 32 },
          { id: 3, name: 'Charlie', age: 24 }
        ]);
      }, 1000);
    });
  };

  const processData = async () => {
    const data = await fetchData();
    const adults = data.filter(({ age }) => age >= 30);
    return adults.map(({ name, age }) => `${name} is ${age} years old.`);
  };

  const main = async () => {
    try {
      const messages = await processData();
      messages.forEach(message => print(message));
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  main();
})();
