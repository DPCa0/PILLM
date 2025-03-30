Certainly! Below is a JavaScript program that uses advanced features like async/await, Promises, destructuring, template literals, and the fetch API to make an API call and display formatted data:

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
(async () => {
  try {
    const apiURL = 'https://api.spacexdata.com/v4/launches/latest';  
    const { name, date_utc: dateUTC, rocket, details } = await fetchData(apiURL);

    const rocketData = await fetchData(`https: 
    const { name: rocketName } = rocketData;

    const formattedDate = new Date(dateUTC).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    console.log(`🚀 Launch Info:
    Mission: ${name}
    Rocket: ${rocketName}
    Date: ${formattedDate}
    Details: ${details || 'No details available.'}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

Ensure you run this code in an environment that supports the Fetch API, such as a modern web browser or using Node.js with the node-fetch package.