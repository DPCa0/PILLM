 
async function fetchUserData() {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  try {
    print("Fetching user data...");
    
     
    await delay(1000);
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
     
    const userData = (await response.json()) ?? {};
    print(`User Name: ${userData?.name ?? "Unknown"}`);
    
     
    const { email, address: { city } = {} } = userData;
    print(`Email: ${email}, City: ${city}`);
    
  } catch (error) {
     
    console.error('Error fetching user data:', error);
  } finally {
    print("Finished fetching user data");
  }
}

 
(async function() {
  await fetchUserData();
})();
