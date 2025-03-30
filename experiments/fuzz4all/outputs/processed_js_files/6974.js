 

async function fetchData(url) {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const fakeData = { id: 1, name: 'Alice', age: 30, location: { city: 'Wonderland', zip: '12345' } };
      url ? resolve(fakeData) : reject(new Error('URL not provided'));
    }, 1000);
  });
}

async function main() {
  try {
    const url = 'https://api.example.com/user';
    
    const data = await fetchData(url);
    
     
    const { name, location: { city }, ...rest } = data;
    
     
    const updatedData = { ...rest, name: name.toUpperCase(), city };
    
     
    print('Original Data:', data);
    print('Updated Data:', updatedData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
