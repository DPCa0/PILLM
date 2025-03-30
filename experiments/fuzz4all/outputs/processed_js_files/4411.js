const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  const filteredData = data.filter(item => item.isActive);
  return filteredData.map(({ id, name, email }) => ({ id, name, email }));
};

const createDOMElements = (processedData) => {
  const container = document.createElement('div');
  container.className = 'user-container';

  processedData.forEach(({ name, email }) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';

    const nameElement = document.createElement('h2');
    nameElement.textContent = name;

    const emailElement = document.createElement('p');
    emailElement.textContent = email;

    userDiv.appendChild(nameElement);
    userDiv.appendChild(emailElement);
    container.appendChild(userDiv);
  });

  document.body.appendChild(container);
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const rawData = await fetchData(url);
  const processedData = processData(rawData);
  createDOMElements(processedData);
})();
