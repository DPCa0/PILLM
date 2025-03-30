const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error: ", error);
    return null;
  }
};

const processData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = await fetchData(url);
  
  if (!data) return;
  
  const transformedData = data
    .filter(({ id }) => id % 2 === 0)
    .map(({ title, body }) => ({ title: title.toUpperCase(), body }));

  return transformedData;
};

(async () => {
  const data = await processData();
  if (data) {
    data.forEach(({ title, body }) => {
      print(`Title: ${title}\nBody: ${body}\n`);
    });
  }
})();
