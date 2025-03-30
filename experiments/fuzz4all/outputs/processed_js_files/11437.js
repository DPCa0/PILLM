 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: { name: "Alice", age: 30 },
        location: { city: "Wonderland", country: "Imagination" }
      };
      resolve(data);
    }, 1000);
  });
}

 
async function processUserData(url) {
  try {
    const data = await fetchData(url);

     
    const { user: { name, age }, location: { city } } = data;

     
    const userData = new Proxy({ name, age, city }, {
      get(target, prop) {
        print(`Accessing property '${prop}'`);
        return target[prop];
      },
    });

     
    print(`User: ${userData.name}, Age: ${userData.age}, City: ${userData.city}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
processUserData("https://api.example.com/user");
