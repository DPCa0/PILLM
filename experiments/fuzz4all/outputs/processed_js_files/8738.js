 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: {
          name: 'Alice',
          age: 28,
          interests: ['reading', 'coding', 'hiking']
        },
        meta: {
          timestamp: new Date().toISOString()
        }
      };
      resolve(data);
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const { user: { name, interests }, meta: { timestamp } } = await fetchData();
    print(`Data fetched on: ${timestamp}`);
    
    const newInterests = [...interests, 'photography'];
    print(`Updated interests for ${name}: ${newInterests.join(', ')}`);

    if (newInterests.includes('coding')) {
      print(`${name} loves coding!`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processUserData();
