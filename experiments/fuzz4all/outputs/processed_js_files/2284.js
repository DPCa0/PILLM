 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

async function fetchData(number) {
  const url = `https: 
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

async function main() {
  const generator = numberGenerator();
  let results = [];

  while (results.length < 5) {
    const { value } = generator.next();
    try {
      const data = await fetchData(value);
      results.push(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  print(results);
}

main().catch(error => console.error('Main error:', error));
