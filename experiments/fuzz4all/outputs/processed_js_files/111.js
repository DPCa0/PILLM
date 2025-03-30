 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
  ];

  try {
    const data = await Promise.all(urls.map(url => fetchData(url)));
    const [{ userId, title: firstTitle }, { title: secondTitle }] = data;

    const transformedData = [
      ...data.map(({ id, title }) => ({ id, summary: title.slice(0, 10) })),
    ];

    print(`User ID: ${userId}`);
    print(`First Title: ${firstTitle}`);
    print(`Second Title: ${secondTitle}`);
    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processData();
