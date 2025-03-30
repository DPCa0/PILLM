 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
     
    let data = await response.json();
    processUserData(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function processUserData(data) {
   
  data.results.forEach(({ name: { first, last }, email }) => {
    print(`Name: ${first} ${last}, Email: ${email}`);
  });

   
  const allNames = data.results.map(user => `${user.name.first} ${user.name.last}`);
  const uniqueNames = [...new Set(allNames)];
  print('Unique Names:', uniqueNames);

   
  const userLocation = data.results[0]?.location?.city ?? 'Unknown Location';
  print('First User Location:', userLocation);
}

 
(async () => {
  await fetchData('https://randomuser.me/api/?results=5');
})();
