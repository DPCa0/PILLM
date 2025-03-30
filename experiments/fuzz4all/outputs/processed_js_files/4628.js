(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = (data) => {
    return data.map((item) => ({ 
      ...item, 
      formattedDate: new Date(item.timestamp).toLocaleDateString() 
    }));
  };

  const createHTMLElement = (tagName, attributes = {}, children = []) => {
    const element = document.createElement(tagName);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  };

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processedData = processData(data);

    const app = document.getElementById('app');
    if (app) {
      processedData.forEach(({ id, title, formattedDate }) => {
        const postElement = createHTMLElement('div', { class: 'post' }, [
          createHTMLElement('h2', {}, [title]),
          createHTMLElement('p', {}, [`Posted on: ${formattedDate}`]),
        ]);
        app.appendChild(postElement);
      });
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
