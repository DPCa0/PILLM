 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Alice', age: 30, job: 'Developer' },
        { name: 'Bob', age: 25, job: 'Designer' },
        { name: 'Charlie', age: 35, job: 'Manager' },
      ]);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const data = await fetchData();  
    const people = data.map(({ name, age, job }) => ({ name, age, job }));  

    people.forEach(({ name, age, job }) => {
      setTimeout(() => {
        print(`${name}, a ${job}, is ${age} years old.`);
      }, age * 10);  
    });
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

processData();  
