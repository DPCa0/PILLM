 

 
const fetchData = async (id) => {
  const userPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe', age: 28, hobbies: ['reading', 'hiking'] });
    }, 1000);
  });
  return await userPromise;
};

 
const processData = async () => {
  try {
    const { name, hobbies } = await fetchData(1);
    print(`Name: ${name}`);
    print('Hobbies:');
    
     
    const hobbiesMap = new Map(hobbies.map((hobby, index) => [index + 1, hobby.toUpperCase()]));
    hobbiesMap.forEach((value, key) => print(`${key}: ${value}`));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processData();
