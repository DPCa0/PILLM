const fetchData = async (url) => {
   
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
   
  return data.map(({ id, name, age }) => ({
     
    [id]: `Name: ${name}, Age: ${age}`,
  }));
};

const renderData = (processedData) => {
   
  processedData.forEach((entry) => {
    const element = document.createElement('div');
    element.innerHTML = `<p>${Object.values(entry)}</p>`;
    document.body.appendChild(element);
  });
};

(async () => {
   
  const dataUrl = 'https://api.example.com/users';
  
   
  const data = (await fetchData(dataUrl)) && processData(data);
  
  data && renderData(data);
})();
