const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

const processData = (data) => {
  return data
    .filter(item => item.isActive)
    .map(({ id, name, nested }) => ({
      id,
      name,
      value: nested?.value || 0,
    }))
    .reduce((acc, item) => {
      acc[item.id] = { ...item, computed: item.value * 2 };
      return acc;
    }, {});
};

const composeAsync = (...fns) => (x) =>
  fns.reduceRight((acc, fn) => acc.then(fn), Promise.resolve(x));

const url = 'https://api.example.com/data';
const main = composeAsync(processData, fetchData);

(async () => {
  const results = await main(url);
  console.table(results);
})();
