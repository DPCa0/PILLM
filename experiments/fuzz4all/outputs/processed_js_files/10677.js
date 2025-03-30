 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const composeAsync = (...fns) => input =>
  fns.reduceRight(async (chain, fn) => fn(await chain), input);

const logger = async function* (data) {
  for (const item of data) {
    print('Logging item:', item);
    yield item;
  }
};

const processData = async (data) => {
  return data.map(item => ({ ...item, processed: true }));
};

const run = async () => {
  try {
    const composedFunction = composeAsync(
      async data => {
        for await (const item of logger(data)) {
          print('Processed:', item);
        }
      },
      processData,
      fetchData
    );

    await composedFunction('https://jsonplaceholder.typicode.com/posts');
  } catch (error) {
    console.error('Error:', error);
  }
};

run();
