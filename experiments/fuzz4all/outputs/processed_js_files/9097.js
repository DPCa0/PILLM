 

const fetchUserData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        age: 30,
        skills: ['JavaScript', 'React', 'Node.js'],
      });
    }, 1000);
  });
};

const processUserData = async () => {
  try {
    const data = await fetchUserData('https://api.example.com/user');
    
     
    const extendedData = {
      ...data,
      skills: [...data.skills, 'TypeScript', 'GraphQL'],
      location: 'New York',
    };

    const { name, age, ...rest } = extendedData;
    const summary = {
      basicInfo: { name, age },
      ...rest,
    };

    print('Original Data:', data);
    print('Extended Data:', extendedData);
    print('Summary:', summary);

    return summary;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
(async () => {
  await processUserData();
})();
