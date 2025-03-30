(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = ({ results }) => 
    results.map(({ name: { first, last }, dob: { age } }) => 
      `${first} ${last} (${age} years old)`
    );

  const logData = async (userArray) => {
    for (const user of userArray) {
      print(user);
      await delay(500);  
    }
  };

  try {
    const userData = await fetchData('https://randomuser.me/api/?results=5');
    const processedData = processData(userData);
    await logData(processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
