 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
};

const processData = ({ results: [firstResult, ...otherResults] }) => {
  print(`Processing first result: ${firstResult.name.first} ${firstResult.name.last}`);
  print(`Other results count: ${otherResults.length}`);
};

(async () => {
  const apiUrl = 'https://randomuser.me/api/?results=5';
  const data = await fetchData(apiUrl);
  if (data) {
    processData(data);
  }
})();
