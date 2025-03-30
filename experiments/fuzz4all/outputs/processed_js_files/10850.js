 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function processData(data) {
  const { userId, id, title, body } = data;
  return { userId, id, title: title.toUpperCase(), body };
}

function* generateNumbers() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const rawData = await fetchData(url);
  const processedData = processData(rawData);

  const { userId, title } = processedData;
  print(`User ID: ${userId}, Title: ${title}`);

  const numberGenerator = generateNumbers();
  for (let i = 0; i < 3; i++) {
    print(`Generated number: ${numberGenerator.next().value}`);
  }
})();
