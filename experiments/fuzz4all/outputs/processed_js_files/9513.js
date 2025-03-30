 

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
    throw error;
  }
};

const processData = ({ name, age, location: { city, country } }) => {
  print(`Processing data for ${name}, who is ${age} years old and lives in ${city}, ${country}.`);
};

const main = async () => {
  const urls = [
    'https://api.example.com/data/1',
    'https://api.example.com/data/2',
    'https://api.example.com/data/3'
  ];

  try {
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.all(promises);

    results.forEach(result => {
      processData(result);
    });
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
  }
};

 
main();
