 
const fetchAndProcessData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

     
    const { users } = data;

     
    const activeUsers = users
      .filter(({ isActive }) => isActive)
      .map(({ name, email }) => ({
        name: name.toUpperCase(),
        email: email.toLowerCase(),
      }));

     
    const uniqueDomains = [
      ...new Set(activeUsers.map(({ email }) => email.split('@')[1])),
    ];
    print(`Unique Email Domains: ${uniqueDomains.join(', ')}`);
    
     
    const userSummary = activeUsers.reduce(
      (summary, { name, email }) => {
        summary.names.push(name);
        summary.emails.push(email);
        return summary;
      },
      { names: [], emails: [] }
    );

    console.table(userSummary);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  await fetchAndProcessData(apiUrl);
})();
