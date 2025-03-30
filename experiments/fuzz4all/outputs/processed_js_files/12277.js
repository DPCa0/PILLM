 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
        status: 'success'
      };
      Math.random() > 0.1 ? resolve(data) : reject('Fetch error');
    }, 1000);
  });
}

 
async function processUserData() {
  try {
     
    const { users, status } = await fetchData('https://example.com/api');
    
    if (status === 'success') {
       
      function* userNameGenerator(users) {
        for (const user of users) {
          yield user.name;
        }
      }

      const userNames = userNameGenerator(users);
      for (const name of userNames) {
        print(`User: ${name}`);
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
(async () => {
  await processUserData();
})();
