 
async function fetchAndProcessUserData() {
  const url = 'https://jsonplaceholder.typicode.com/users';

  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const users = await response.json();

     
    const processedUsers = users
      .filter(({ address: { geo: { lat } } }) => parseFloat(lat) > 0)
      .map(({ name, email, address: { city, geo: { lat, lng } } }) => ({
        name,
        email,
        city,
        coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) }
      }));

     
    const message = tagMessage`Fetched ${processedUsers.length} users located in the northern hemisphere.`;

     
    print(message);
    print(processedUsers);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
function tagMessage(strings, count) {
  const emphasize = count > 5 ? '!' : '.';
  return `${strings[0]}${count}${strings[1]}${emphasize}`;
}

 
fetchAndProcessUserData();
