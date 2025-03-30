 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ id: 1, name: 'John Doe', age: 30, location: 'Earth' });
      } else {
        reject("URL not found");
      }
    }, 1000);
  });
}

 
function* userDataGenerator(data) {
  yield* data;
}

 
async function processData() {
  try {
     
    const data = await fetchData("https://api.example.com/data");

     
    const { name, age, ...rest } = data;
    print(`User: ${name}, Age: ${age}`);

     
    const newData = { ...rest, status: 'Active' };
    print('New Data:', newData);

     
    const generator = userDataGenerator(Object.values(newData));
    for (let value of generator) {
      print('Value from generator:', value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

 
processData();
