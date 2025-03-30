 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: {
          name: 'Alice',
          age: 30,
          hobbies: ['reading', 'gardening', 'coding']
        },
        status: 'success'
      };
      resolve(data);
    }, 1000);
  });
}

 
async function processUserData(url) {
  try {
    const { user: { name, age, hobbies }, status } = await fetchData(url);

    if (status === 'success') {
      print(`Name: ${name}`);
      print(`Age: ${age}`);
      print('Hobbies:', ...hobbies);

      const updatedHobbies = [...hobbies, 'blogging'];
      print('Updated Hobbies:', ...updatedHobbies);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
processUserData('https://api.example.com/user');
