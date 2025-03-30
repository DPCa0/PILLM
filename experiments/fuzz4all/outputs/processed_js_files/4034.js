 

 
async function fetchData(url) {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { name: "John Doe", age: 30, job: "Engineer" } });
    }, 2000);
  });
}

 
async function processUserData() {
  try {
    const { data: { name, age, job } } = await fetchData("https://api.example.com/user");

     
    print(`User Info:\n- Name: ${name}\n- Age: ${age}\n- Job: ${job}`);

     
    const processedData = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Processed User: ${name}, ${age} years old, works as an ${job}`);
      }, 1000);
    });

    print(processedData);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

 
(async function run() {
  print("Fetching and processing user data...");
  await processUserData();
  print("Processing complete.");
})();
