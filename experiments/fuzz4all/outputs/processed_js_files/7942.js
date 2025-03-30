 
const asyncPipeline = (...fns) => x =>
  fns.reduce((acc, fn) => acc.then(fn), Promise.resolve(x));

 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processUserData = (data) => {
  const { name, email } = data;
  return { name, email };
};

const formatData = ({ name, email }) => {
  return `User: ${name}, Email: ${email}`;
};

 
(async () => {
  try {
    const result = await asyncPipeline(
      () => fetchData('https://jsonplaceholder.typicode.com/users/1'),
      processUserData,
      formatData
    )();

    print(result);
  } catch (error) {
    console.error('Error:', error);
  }
})();
