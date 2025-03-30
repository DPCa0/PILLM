 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
};

const processData = ({ results: [firstResult], info: { seed, version } }) => {
  const { name: { first, last }, location: { city, country }, email } = firstResult;
  print(`Seed: ${seed}, Version: ${version}`);
  print(`Name: ${first} ${last}, City: ${city}, Country: ${country}, Email: ${email}`);
};

const main = async (...urls) => {
  try {
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.all(promises);
    results.forEach(data => processData(data));
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
main('https://randomuser.me/api/', 'https://randomuser.me/api/');
