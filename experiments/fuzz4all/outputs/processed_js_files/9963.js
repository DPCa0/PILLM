 

 
async function* fetchUserData(userCount) {
  const baseUrl = 'https://jsonplaceholder.typicode.com/users';
  let current = 1;

  while (current <= userCount) {
    const response = await fetch(`${baseUrl}/${current}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const userData = await response.json();
    yield userData;
    current++;
  }
}

 
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function processUserData() {
  const userCount = 5;
  try {
    for await (const user of fetchUserData(userCount)) {
      print(`User: ${user.name}, Email: ${user.email}`);
      await wait(Math.random() * 1000);  
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
(async () => {
  print('Starting to process user data...');
  await processUserData();
  print('Finished processing user data.');
})();
