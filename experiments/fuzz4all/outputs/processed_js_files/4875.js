 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: {
          name: 'Alice',
          age: 30,
          location: {
            city: 'Wonderland',
            zip: '0000'
          }
        }
      };
       
      Math.random() > 0.5 ? resolve(data) : reject('Fetch error!');
    }, 1000);
  });
};

 
async function getUserInfo() {
  try {
    const { user: { name, age, location: { city } } } = await fetchData();
    print(`Name: ${name}, Age: ${age}, City: ${city}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
getUserInfo();
