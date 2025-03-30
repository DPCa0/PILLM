const pipeline = async (...fns) => arg => {
  for (const fn of fns) arg = await fn(arg);
  return arg;
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getData = async url => {
  const response = await fetch(url);
  return response.json();
};

const processData = async data => {
  await delay(1000);  
  return data.map(item => ({ ...item, processed: true }));
};

const logResult = result => {
  print("Processed Data:", JSON.stringify(result, null, 2));
  return result;
};

const errorHandler = fn => async arg => {
  try {
    return await fn(arg);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

const main = pipeline(
  errorHandler(getData),
  errorHandler(processData),
  errorHandler(logResult)
);

main('https://jsonplaceholder.typicode.com/posts');
