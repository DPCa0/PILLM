class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const asyncWrapper = fn => (...args) =>
  fn(...args).catch(err => console.error(`Error: ${err}`));

const fetchData = asyncWrapper(async url => {
  let response = await fetch(url);
  if (!response.ok) throw new CustomError(`HTTP error! Status: ${response.status}`);
  let data = await response.json();
  return data;
});

const processData = data => {
  try {
    const [firstItem] = data;
    if (!firstItem) throw new CustomError('No data found!');
    return firstItem;
  } catch (error) {
    console.error(error.toString());
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  let data = await fetchData(url);
  let result = processData(data);
  print('Processed Result:', result);
})();
