 

 
const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30, country: 'Wonderland' });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const userData = await fetchData();
    
     
    const { name, ...rest } = userData;
    const newUserData = { username: name.toLowerCase(), ...rest };

    print('Processed User Data:', newUserData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  print('Fetching and processing user data...');
  await processUserData();
})();
