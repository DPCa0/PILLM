 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: { id: 1, name: 'Alice', role: 'Developer' } });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { data: { id, name, role } } = await fetchData('https://api.example.com/data');
    
     
    console.log(`User Info:
    - ID: ${id}
    - Name: ${name}
    - Role: ${role}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

processData();
