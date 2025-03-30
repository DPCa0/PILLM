(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = ({ name, population }) => ({
    name,
    populationInMillions: (population / 1_000_000).toFixed(2),
  });

  const displayCountries = (countries) => {
    countries.forEach(({ name, populationInMillions }) => {
      print(`Country: ${name}, Population: ${populationInMillions} million`);
    });
  };

  try {
    const url = 'https://restcountries.com/v3.1/all';
    const countriesData = await fetchData(url);

    const processedData = countriesData
      .filter(({ population }) => population > 10_000_000)
      .map(processData)
      .sort((a, b) => b.populationInMillions - a.populationInMillions);

    displayCountries(processedData);
  } catch (error) {
    console.error('Failed to fetch or process data:', error);
  }
})();
