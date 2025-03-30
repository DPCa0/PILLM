const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const processData = (data) => {
  return data.map(({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    value: value * 2,
  }));
};

const visualizeData = (data) => {
  const container = document.getElementById('data-visualization');
  container.innerHTML = '';
  data.forEach(({ id, name, value }) => {
    const div = document.createElement('div');
    div.style.width = `${value}px`;
    div.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    div.style.margin = '5px';
    div.textContent = `${name} (${id}): ${value}`;
    container.appendChild(div);
  });
};

(async () => {
  const url = 'https://api.example.com/data';  
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData(rawData);
    visualizeData(processedData);
  }
})();

 
 
