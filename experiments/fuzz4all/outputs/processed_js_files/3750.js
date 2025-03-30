 

(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

   
  async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  }

   
  async function getUserData() {
    try {
      print('Fetching user data...');
      const url = 'https://jsonplaceholder.typicode.com/users/1';
      const { name, email, address: { city } } = await fetchData(url);

      print('Processing user data...');
      await delay(2000);  

      print(`User Name: ${name}`);
      print(`Email: ${email}`);
      print(`City: ${city}`);
    } catch (error) {
      console.error('Error fetching or processing user data:', error);
    }
  }

   
  await getUserData();
})();
