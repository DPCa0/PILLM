 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

async function fetchData() {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function processAndLogData() {
  const data = await fetchData();
  const { userId, title } = data;

   
  print(`User ID: ${userId}, Title: ${title}`);

  const gen = numberGenerator();

   
  const mapDataToNumbers = Object.entries(data).map(([key, value]) => {
    return { [key]: value, number: gen.next().value };
  });

  for (const entry of mapDataToNumbers) {
    print(entry);
  }
}

processAndLogData().catch(error => console.error('Error:', error));
