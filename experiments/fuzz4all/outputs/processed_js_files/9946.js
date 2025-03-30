const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data.map(({ name, age, hobbies }) => ({
    name: name.toUpperCase(),
    isAdult: age >= 18,
    hobbies: hobbies.filter(hobby => hobby.length > 5)
  }));
};

(async () => {
  try {
    const url = 'https://api.example.com/users';
    const data = await fetchData(url);

    const processedData = processData(data);

    print('Processed Data:', processedData);

    const [firstUser, ...otherUsers] = processedData;
    print('First User:', firstUser);

    const adultNames = processedData
      .filter(user => user.isAdult)
      .reduce((names, { name }) => `${names}, ${name}`, 'Adults:')
      .slice(8);

    print(adultNames);

  } catch (error) {
    console.error('Error:', error);
  }
})();
