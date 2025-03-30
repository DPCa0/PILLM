 

async function fetchData(urls) {
  const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));

  try {
    const results = await Promise.all(fetchPromises);
    results.forEach(({ name, age }) => {
      print(`Name: ${name}, Age: ${age}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const userUrls = [
  'https://api.example.com/user/1',
  'https://api.example.com/user/2',
  'https://api.example.com/user/3'
];

fetchData(userUrls);
