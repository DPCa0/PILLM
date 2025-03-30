const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ name, age, hobbies }) => {
  return `Name: ${name}, Age: ${age}, Hobbies: ${hobbies.join(', ')}`;
};

const createElement = ({ tag = 'div', attributes = {}, innerText = '' }) => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  element.innerText = innerText;
  return element;
};

const renderData = (data) => {
  const container = document.querySelector('#app');
  container.innerHTML = '';  
  const element = createElement({ tag: 'p', innerText: processData(data) });
  container.appendChild(element);
};

(async () => {
  try {
    const url = 'https://api.example.com/user';
    const data = await fetchData(url);
    renderData(data);
  } catch (error) {
    console.error('Error:', error);
  }
})();
