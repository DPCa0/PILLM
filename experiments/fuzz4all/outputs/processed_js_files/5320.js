 
const fetchUserData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const users = await response.json();
    
     
    const emailDomains = users
      .filter(user => user.email.includes('@'))
      .map(user => user.email.split('@')[1])
      .reduce((acc, domain) => {
        acc[domain] = (acc[domain] || 0) + 1;
        return acc;
      }, {});

     
    for (const [domain, count] of Object.entries(emailDomains)) {
      print(`Domain: ${domain}, Count: ${count}`);
    }

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
(async () => {
  print('Fetching user data...');
  await fetchUserData();
  print('Completed fetching data');
})();
