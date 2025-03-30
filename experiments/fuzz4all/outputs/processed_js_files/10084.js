const fetchUserData = async (userId) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        age: 30,
        hobbies: ['coding', 'hiking', 'reading']
      });
    }, 1000);
  });
};

const processUserData = ({ id, name, age, hobbies }) => {
   
  print(`User ID: ${id}`);
  print(`Name: ${name}`);
  print(`Age: ${age}`);
  print(`Hobbies: ${hobbies.join(', ')}`);
  return {
    id,
    name,
    isAdult: age >= 18,
    hobbyCount: hobbies.length
  };
};

const displayProcessedData = ({ id, name, isAdult, hobbyCount }) => {
  print(`\nProcessed Data for User ID: ${id}`);
  print(`Name: ${name}`);
  print(`Adult: ${isAdult ? 'Yes' : 'No'}`);
  print(`Number of Hobbies: ${hobbyCount}`);
};

(async () => {
  try {
     
    const userData = await fetchUserData(1);
    const processedData = processUserData(userData);
    displayProcessedData(processedData);

     
    const unknownUserData = null;
    const name = unknownUserData?.name ?? 'Unknown User';
    print(`\nOptional Chaining Example: ${name}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
