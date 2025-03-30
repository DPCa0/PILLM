 

 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

 
function* fetchAndTransform(urls) {
  for (const url of urls) {
    yield fetchData(url)
      .then(data => ({
        fullName: `${data.results[0].name.first} ${data.results[0].name.last}`,
        email: data.results[0].email,
      }))
      .catch(error => console.error(`Failed to fetch data: ${error}`));
  }
}

 
async function handleFetch(generator) {
  for await (let result of generator) {
    print('Transformed User:', result);
  }
}

 
(async () => {
  const urls = [
    'https://randomuser.me/api/',
    'https://randomuser.me/api/',
    'https://randomuser.me/api/',
  ];

  const fetchGenerator = fetchAndTransform(urls);

  await handleFetch(fetchGenerator);
})();
