const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);

const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const filterData = (data) => data.filter(item => item.isActive);

const transformData = (data) => data.map(item => ({
  id: item.id,
  name: item.name.toUpperCase(),
  tags: item.tags.join(', ')
}));

const logData = (data) => {
  print('Processed Data:', data);
  return data;
};

const errorHandling = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const processData = compose(
  logData,
  transformData,
  filterData
);

const runApp = errorHandling(async (url) => {
  const rawData = await fetchData(url);
  processData(rawData);
});

runApp('https://jsonplaceholder.typicode.com/users');
