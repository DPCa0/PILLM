 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Advanced JavaScript', description: 'Learn advanced JavaScript features.' };
      const success = Math.random() > 0.1;
      success ? resolve(data) : reject('Failed to fetch data.');
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const data = await fetchData();
     
    const { id, name, description } = data;
     
    print(`Course ID: ${id}\nCourse Name: ${name}\nDescription: ${description}`);

     
    const nameArray = name.split(' ').map(word => word.toUpperCase());
    print(`Uppercase Name: ${nameArray.join(' ')}`);

     
    const numbers = [1, 2, 2, 3, 4, 4, 5];
    const uniqueNumbers = [...new Set(numbers)];
    print(`Unique Numbers: ${uniqueNumbers}`);

     
    for (const num of uniqueNumbers) {
      print(`Number: ${num}`);
    }

     
    function* idGenerator() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }
    
    const gen = idGenerator();
    print(`Generated ID: ${gen.next().value}`);
    print(`Generated ID: ${gen.next().value}`);

  } catch (error) {
    console.error(error);
  }
};

 
processData();
