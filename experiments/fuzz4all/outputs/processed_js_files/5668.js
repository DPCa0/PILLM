 
 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const logWithDelay = async (msg, ms) => {
  print(msg);
  await delay(ms);
};

 
const getUserData = async userId => {
  const response = await fetch(`https: 
  if (!response.ok) throw new Error(`Failed to fetch data for user ${userId}`);
  return response.json();
};

 
(async () => {
  try {
    for (let id = 1; id <= 3; id++) {
      await logWithDelay(`Fetching data for user ${id}...`, 1000);
      const userData = await getUserData(id);

      const { name, email, address: { city } } = userData;   

      print(`Name: ${name}`);
      print(`Email: ${email}`);
      print(`City: ${city}`);
      print('-----------------------------');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
