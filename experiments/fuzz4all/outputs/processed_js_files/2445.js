 
async function* fetchData() {
  for (let url of ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2']) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

async function* transformData(dataIterator) {
  for await (let data of dataIterator) {
    yield {
      ...data,
      transformed: true,
      summary: data.body.slice(0, 50)
    };
  }
}

async function* formatData(dataIterator) {
  for await (let data of dataIterator) {
    yield JSON.stringify(data, null, 2);
  }
}

async function executePipeline() {
  const dataIterator = fetchData();
  const transformedIterator = transformData(dataIterator);
  const formattedIterator = formatData(transformedIterator);

  for await (let formattedData of formattedIterator) {
    print(formattedData);
  }
}

 
(async () => {
  try {
    await executePipeline();
  } catch (error) {
    console.error('Error:', error);
  }
})();
