 

 
const fetchData = async (url) => {
   
  const mockFetch = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({
          data: [
            { id: 1, name: 'Alice', age: 25 },
            { id: 2, name: 'Bob', age: 30 },
            { id: 3, name: 'Charlie', age: 35 },
          ],
        });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });

   
  try {
    const response = await mockFetch;
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
const processData = async () => {
  const url = 'https://api.example.com/data';
  const data = await fetchData(url);

  if (data) {
     
    const formattedData = data.map(({ id, name, age }) => {
      return `ID: ${id}, Name: ${name.toUpperCase()}, Age: ${age + 5}`;
    });

     
    formattedData.forEach((info, index) => {
      print(`User ${index + 1}: ${info}`);
    });
  }
};

 
processData();
