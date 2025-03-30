const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data }) =>
  data.map(({ id, attributes: { title, value } }) => ({ id, title, value }));

const filterData = (data, searchTerm) =>
  data.filter(({ title }) => title.toLowerCase().includes(searchTerm.toLowerCase()));

const createDOMElement = (tagName, attributes, ...children) => {
  const element = document.createElement(tagName);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  children.forEach((child) => element.appendChild(child instanceof Node ? child : document.createTextNode(child)));
  return element;
};

const renderData = (filteredData) => {
  const container = document.getElementById('dataContainer');
  container.innerHTML = '';  
  filteredData.forEach(({ id, title, value }) => {
    const item = createDOMElement('div', { class: 'data-item', 'data-id': id },
      createDOMElement('h3', {}, title),
      createDOMElement('p', {}, `Value: ${value}`)
    );
    container.appendChild(item);
  });
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const initApp = async () => {
  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);

    const handleSearch = (event) => {
      const searchTerm = event.target.value;
      const filteredData = filterData(processedData, searchTerm);
      renderData(filteredData);
    };

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    renderData(processedData);
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
