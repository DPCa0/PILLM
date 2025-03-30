const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const processData = (data) => {
  return data
    .map(({ name, age }) => ({ name, age, adult: age >= 18 }))
    .reduce(
      (acc, curr) => {
        curr.adult ? acc.adults.push(curr) : acc.minors.push(curr);
        return acc;
      },
      { adults: [], minors: [] }
    );
};

const logResults = ({ adults, minors }) => {
  console.group('Results');
  console.group('Adults');
  console.table(adults);
  console.groupEnd();

  console.group('Minors');
  console.table(minors);
  console.groupEnd();
  console.groupEnd();
};

(async () => {
  const dataUrl = 'https://api.example.com/users';
  const rawData = await fetchData(dataUrl);

  if (rawData) {
    const processedData = processData(rawData);
    logResults(processedData);
  }
})();
