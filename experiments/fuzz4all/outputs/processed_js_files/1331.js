(async () => {
   
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

   
  const processData = (data) => {
    const parsedData = data.map(({ id, title, body }) => ({
      id,
      title,
      summary: body.substring(0, 50) + '...',
    }));
    const filteredData = parsedData.filter(({ id }) => id % 2 === 0);
    return filteredData;
  };

   
  const highlight = (strings, ...values) => {
    return strings.reduce((result, string, i) => {
      const value = values[i] ? `<span class="highlight">${values[i]}</span>` : '';
      return `${result}${string}${value}`;
    }, '');
  };

  const displayData = (items) => {
    const html = items.map(({ id, title, summary }) => `
      <li>
        ${highlight`<strong>ID:</strong> ${id}`}<br>
        ${highlight`<strong>Title:</strong> ${title}`}<br>
        ${highlight`<strong>Summary:</strong> ${summary}`}
      </li>`).join('');
    document.body.innerHTML = `<ul>${html}</ul>`;
  };

   
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  if (data) {
    const processedData = processData(data);
    displayData(processedData);
  }
})();
