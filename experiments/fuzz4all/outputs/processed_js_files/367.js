const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  const processed = data.map(({ id, title, userId }) => ({ id, title, userId }));
  return processed.filter(({ userId }) => userId % 2 === 0);
};

const displayData = (data) => {
  const container = document.createElement('div');
  container.classList.add('data-container');
  data.forEach(({ id, title, userId }) => {
    const item = document.createElement('div');
    item.classList.add('data-item');
    item.innerHTML = `<strong>ID:</strong> ${id}, <strong>Title:</strong> ${title}, <strong>UserID:</strong> ${userId}`;
    container.appendChild(item);
  });
  document.body.appendChild(container);
};

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  if (data) {
    const processedData = processData(data);
    displayData(processedData);
  }
})();
