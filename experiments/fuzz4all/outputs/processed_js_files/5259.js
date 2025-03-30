const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data.map(({ id, value }) => ({ id, doubled: value * 2 }));
};

const displayData = (data) => {
  console.table(data);
};

const pipe = (...functions) => (input) =>
  functions.reduce((acc, fn) => fn(acc), input);

(async () => {
  const url = 'https://api.example.com/data';
  const dataPipeline = pipe(fetchData, processData, displayData);
  await dataPipeline(url);
})();
