 

 
(async () => {
  const { default: _ } = await import('https://cdn.skypack.dev/lodash');

   
  const users = [
    { name: 'John Doe', age: 28, location: 'New York' },
    { name: 'Jane Smith', age: 34, location: 'London' },
    { name: 'Sam Green', age: 21, location: 'Tokyo' },
    { name: 'Paul Brown', age: 30, location: 'Berlin' }
  ];

   
  const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000);
  });

  const processData = async () => {
    const data = await fetchUserData();

     
    const processUser = ({ name, age, location }) => ({
      name,
      isAdult: age >= 18,
      location: _.capitalize(location)
    });

    const processedData = data.map(processUser);

    print('Processed User Data:', processedData);
  };

  processData();

})();
