 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Could not fetch data: ${error.message}`);
    return null;
  }
};

const processData = ({ name, height, mass, ...rest }) => {
  return {
    name,
    heightInMeters: (parseInt(height) / 100).toFixed(2),
    massInKg: `${mass} kg`,
    additionalInfo: rest
  };
};

(async () => {
  const url = 'https://swapi.dev/api/people/1/';
  const data = await fetchData(url);

  if (data) {
    const processedData = processData(data);
    const { name, heightInMeters, massInKg, additionalInfo } = processedData;
    
    print(`Name: ${name}`);
    print(`Height: ${heightInMeters} meters`);
    print(`Mass: ${massInKg}`);
    print(`Additional Info:`, additionalInfo);
  }
})();
