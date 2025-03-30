(async function() {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  };

  const processUser = ({ name, email }) => {
    return { initials: name.split(' ').map(n => n[0]).join(''), contact: email };
  };

  try {
     
    const users = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users/1'),
      fetchData('https://jsonplaceholder.typicode.com/users/2'),
      fetchData('https://jsonplaceholder.typicode.com/users/3')
    ]);

    const processedUsers = users.map(processUser);

    for (let user of processedUsers) {
      print(`Processed User: ${JSON.stringify(user)}`);
      await sleep(1000);  
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();
