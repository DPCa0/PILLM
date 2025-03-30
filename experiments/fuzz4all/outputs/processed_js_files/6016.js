const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
};

const processData = async (data) => {
  return data.map(({ id, name }) => ({
    id,
    name: name.toUpperCase(),
  }));
};

const displayData = (data) => {
  const container = document.querySelector('#data-container');
  container.innerHTML = '';
  data.forEach(({ id, name }) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = `${id}: ${name}`;
    container.appendChild(div);
  });
};

const throttle = (fn, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
};

const handleScroll = throttle(async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const newData = await fetchData('https://jsonplaceholder.typicode.com/users');
    const processedData = await processData(newData);
    displayData(processedData);
  }
}, 200);

document.addEventListener('DOMContentLoaded', async () => {
  const initialData = await fetchData('https://jsonplaceholder.typicode.com/users');
  const processedData = await processData(initialData);
  displayData(processedData);
  
  window.addEventListener('scroll', handleScroll);
});
