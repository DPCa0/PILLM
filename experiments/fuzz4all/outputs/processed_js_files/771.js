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
  return data
    .filter(({ active }) => active)
    .map(({ id, name, metrics: { views, likes } }) => ({
      id,
      name,
      score: (views + likes) / 2,
    }))
    .sort((a, b) => b.score - a.score);
};

const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};

const renderData = throttle((processedData) => {
  const container = document.getElementById('data-container');
  container.innerHTML = processedData
    .map(({ id, name, score }) => `<div>${name} (ID: ${id}) - Score: ${score.toFixed(2)}</div>`)
    .join('');
}, 1000);

(async () => {
  const url = 'https://api.example.com/data';
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData(rawData);
    renderData(processedData);
  }
})();
