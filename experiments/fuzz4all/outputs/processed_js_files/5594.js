const fs = require('fs').promises;

async function getDataFromUrl(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  return response.json();
}

function filterData(data, predicate) {
  return data.filter(predicate);
}

function transformData(data) {
  return data.map(({ name, age }) => ({ fullName: name.toUpperCase(), ageIn5Years: age + 5 }));
}

async function fetchDataAndProcess() {
  try {
    const data = await getDataFromUrl('https://jsonplaceholder.typicode.com/users');
    const adults = filterData(data, ({ age }) => age >= 18);
    const transformed = transformData(adults);
    await fs.writeFile('output.json', JSON.stringify(transformed, null, 2));
    print('Data processed and saved to output.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchDataAndProcess();
