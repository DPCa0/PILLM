const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processData = async (url) => {
  try {
    const data = await fetchData(url);
    const [first, ...rest] = data.items;
    print(`First item: ${first.name}`);
    const restNames = rest.map(item => item.name);
    print(`Rest of the items: ${restNames.join(', ')}`);

    await delay(2000);
    print('Processing complete.');
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
};

const throttledFetch = _.throttle(() => processData('https://api.example.com/data'), 3000);

document.addEventListener('scroll', throttledFetch);

(() => {
  const uniqueID = Symbol('id');
  const dataObject = {
    [uniqueID]: 12345,
    name: "Complex JS Object",
    details() {
      return `ID: ${this[uniqueID]}, Name: ${this.name}`;
    }
  };

  print(dataObject.details());
})();
