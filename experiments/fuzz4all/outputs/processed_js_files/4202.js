const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
  const filteredData = data.filter((item) => item.active);
  return filteredData.map((item) => ({ ...item, status: 'Processed' }));
};

const displayData = (data) => {
  const container = document.getElementById('data-container');
  container.innerHTML = '';
  data.forEach((item) => {
    const div = document.createElement('div');
    div.textContent = `${item.name}: ${item.status}`;
    container.appendChild(div);
  });
};

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    displayData(processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

window.addEventListener('resize', debounce(() => {
  print('Resize event handled');
   
}, 200));
