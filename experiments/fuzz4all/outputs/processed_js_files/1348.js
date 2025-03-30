 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = (data) => {
  const { results, info } = data;
  print(`Fetched ${results.length} results, version: ${info.version}`);

  return results.map(({ name, location: { city, country }, ...rest }) => ({
    fullName: `${name.first} ${name.last}`,
    location: `${city}, ${country}`,
    otherInfo: rest,
  }));
};

const displayResults = (results) => {
  console.group('Processed Results');
  results.forEach((result, index) => {
    const { fullName, location, otherInfo } = result;
    print(`Result #${index + 1}:`);
    print(`Name: ${fullName}`);
    print(`Location: ${location}`);
    print('Other Info:', otherInfo);
  });
  console.groupEnd();
};

(async () => {
  try {
    const url = 'https://randomuser.me/api/?results=5';
    const data = await fetchData(url);
    const processedResults = processData(data);
    displayResults(processedResults);
  } catch (error) {
    console.error('Error:', error);
  }
})();
