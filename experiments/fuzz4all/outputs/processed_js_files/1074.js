 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { message: 'Hello, advanced JavaScript world!' } });
      } else {
        reject(new Error('URL not provided'));
      }
    }, 1000);
  });
};

const processData = async (url) => {
  try {
     
    const { data: { message } } = await fetchData(url);
    print(message);

     
    const numbers = [1, 2, 3];
    const newNumbers = [...numbers, 4, 5];
    print(`Numbers: ${newNumbers.join(', ')}`);
    
     
    const uniqueNumbers = new Set(newNumbers.map(num => num * 2));
    print(`Unique Doubled Numbers: ${[...uniqueNumbers].join(', ')}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

processData('http://example.com');
