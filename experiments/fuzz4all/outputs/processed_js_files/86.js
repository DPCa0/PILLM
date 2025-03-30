 
const processData = async ([first, ...rest] = []) => {
  try {
    const fetchData = (url) => new Promise((resolve, reject) => {
      setTimeout(() => url ? resolve(`Data from ${url}`) : reject('No URL provided'), 1000);
    });

    const results = await Promise.all([
      fetchData(first),
      ...rest.map(url => fetchData(url))
    ]);

    const [firstResult, ...otherResults] = results;
    print('First Result:', firstResult);

    otherResults.forEach((result, index) => print(`Result ${index + 1}:`, result));

    const mapResult = new Map(rest.map((url, i) => [`URL ${i + 2}`, results[i + 1]]));
    print('Map of Results:', [...mapResult.entries()]);

  } catch (error) {
    console.error('Error:', error);
  }
};

 
function* urlGenerator() {
  yield 'https://api1.example.com/data';
  yield 'https://api2.example.com/data';
  yield 'https://api3.example.com/data';
}

 
processData([...urlGenerator()]);
