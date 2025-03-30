 
(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async () => {
    await delay(1000);
    return { user: { id: 1, name: 'Alice', location: { city: 'Wonderland', country: 'Nowhere' } } };
  };

  const processData = ({ user: { name, location: { city, country } } }) => {
    print(`Hello, ${name} from ${city}, ${country}!`);
  };

  try {
    const data = await fetchData();
    processData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
