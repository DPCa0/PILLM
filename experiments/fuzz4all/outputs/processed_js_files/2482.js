 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
}

const processData = ({ results }) => {
  const uniqueResults = new Set(results.map(item => item.name));
  return Array.from(uniqueResults);
};

async function main() {
  try {
    const url = `https: 
    const data = await fetchData(url);
    const uniqueNames = processData(data);

    uniqueNames.forEach((name, index) => {
      print(`Pokemon #${index + 1}: ${name}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();
