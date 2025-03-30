 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  try {
    print("Fetching data...");
     
    await delay(2000);

     
    const { data } = await new Promise(resolve => 
      resolve({ data: { user: "John Doe", age: 30, location: "Earth" } })
    );

     
    const userMap = new Map(Object.entries(data));

     
    print(`User: ${userMap.get('user')}, Age: ${userMap.get('age')}, Location: ${userMap.get('location')}`);

     
    function* numberGenerator(start, end) {
      while (start <= end) {
        yield start++;
      }
    }

     
    const numbers = [...numberGenerator(1, 5)];

     
    const uniqueNumbers = new Set(numbers);

     
    for (const number of uniqueNumbers) {
      print(`Number: ${number}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(async () => {
  await fetchData();
})();
