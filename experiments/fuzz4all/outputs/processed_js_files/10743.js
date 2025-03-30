const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const processData = (data) => {
  return data.map(({ name, age }) => ({
    name,
    age,
    isAdult: age >= 18,
  }));
};

const asyncFunction = async () => {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchJson(apiUrl);

    const processedData = processData(data);
    const adultUsers = processedData.filter(user => user.isAdult);

    console.group('Adult Users:');
    adultUsers.forEach(({ name, age }) => {
      print(`Name: ${name}, Age: ${age}`);
    });
    console.groupEnd();

    const uniqueChars = [...new Set(adultUsers.flatMap(({ name }) => [...name]))];
    print('Unique Characters in Adult Users\' Names:', uniqueChars.join(', '));
    
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

asyncFunction();
