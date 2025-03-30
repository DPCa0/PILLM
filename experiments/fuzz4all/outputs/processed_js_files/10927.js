 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { name: 'Alice', age: 30 },
        hobbies: ['reading', 'traveling', 'coding'],
      });
    }, 1000);
  });
};

 
const displayUserData = async () => {
  try {
    const { user: { name, age }, hobbies, ...rest } = await fetchData();  

     
    const userInfo = `User: ${name}, Age: ${age}`;
    const hobbiesInfo = `Hobbies: ${hobbies.join(', ')}`;

    print(userInfo);
    print(hobbiesInfo);

     
    const extendedData = { ...rest, occupation: 'Engineer' };
    print('Extended Data:', extendedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

displayUserData();
