 
 

const fetchUserData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

     
    const {
      name = 'Unknown',
      age = 'Not specified',
      address: { city = 'Unknown City', country = 'Unknown Country' } = {}
    } = data;

     
    return `User Details: 
      Name: ${name}, 
      Age: ${age}, 
      Location: ${city}, ${country}`;
  } catch (error) {
    return `Error fetching data: ${error.message}`;
  }
};

 
(async () => {
  const userDetails = await fetchUserData('https://api.example.com/user');
  print(userDetails);
})();

 
const fetchMultipleUsers = async (urls) => {
  try {
    const promises = urls.map(url => fetchUserData(url));
    const results = await Promise.all(promises);
    results.forEach(result => print(result));
  } catch (error) {
    console.error(`Error fetching multiple users: ${error.message}`);
  }
};

 
fetchMultipleUsers([
  'https://api.example.com/user/1',
  'https://api.example.com/user/2',
  'https://api.example.com/user/3'
]);
