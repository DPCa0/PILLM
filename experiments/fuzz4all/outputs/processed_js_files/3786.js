const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data;
};

const processData = async (url) => {
  try {
    const data = await fetchData(url);
    const filteredData = data.filter(({ active }) => active).map(({ name }) => name);
    const uniqueNames = [...new Set(filteredData)];
    print(`Unique active names: ${uniqueNames.join(', ')}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const notifyOnChange = debounce((input) => {
  print(`Input changed to: ${input}`);
}, 300);

document.querySelector('#input').addEventListener('input', (event) => {
  notifyOnChange(event.target.value);
});

 
processData('https://api.example.com/data');
