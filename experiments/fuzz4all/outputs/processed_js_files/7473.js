 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

     
    users.forEach(({ name, email, address: { city } }) => {
      print(`Name: ${name}, Email: ${email}, City: ${city}`);
    });

     
    const usersByCity = new Map();

     
    for (const user of users) {
      const { city } = user.address;
      if (!usersByCity.has(city)) {
        usersByCity.set(city, []);
      }
      usersByCity.get(city).push(user);
    }

     
    const cityArray = [...usersByCity.entries()];

     
    cityArray.forEach(([city, cityUsers]) => {
      print(`\nUsers from ${city}:`);
      cityUsers.forEach(({ name, email }) => {
        print(`- ${name} (${email})`);
      });
    });
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

 
(async () => {
  await fetchDataAndProcess();
})();
