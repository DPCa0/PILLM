 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'John Doe', age: 30, location: 'New York' };
      Math.random() > 0.1 ? resolve(data) : reject('Error fetching data');
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const data = await fetchData();
    
     
    const { user, age, location } = data;
    print(`Fetched data: ${user}, ${age}, from ${location}.`);
    
     
    const userMap = new Map();
    userMap.set('name', user);
    userMap.set('age', age);
    userMap.set('location', location);
    
     
    const processedData = Array.from(userMap.entries()).map(([key, value]) => `${key.toUpperCase()}: ${value}`);
    
    print('Processed data:', processedData.join(' | '));
    
     
    const additionalInfo = { profession: 'Software Developer' };
    const fullInfo = { ...data, ...additionalInfo };
    
    print('Extended user info:', fullInfo);
    
  } catch (error) {
    console.error(`Caught an error: ${error}`);
  }
};

 
processUserData();
