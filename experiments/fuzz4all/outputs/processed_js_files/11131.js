 

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]);
    }, 1000);
  });
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

async function processData() {
  const data = await fetchData();

  const map = new Map(data.map(item => [item.id, item.name]));

  print('Data map:', map);

  print('Iterating over map:');
  for (const [key, value] of map) {
    print(`ID: ${key}, Name: ${value}`);
  }
  
  print('Generating new IDs:');
  for (let i = 0; i < 3; i++) {
    print(`Generated ID: ${idGen.next().value}`);
  }
}

processData();
