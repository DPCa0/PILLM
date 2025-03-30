const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  const filtered = data.filter(({ age }) => age >= 18);
  const sorted = filtered.sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map(({ name, age }) => ({ name, age }));
};

(async () => {
  const url = 'https://randomuser.me/api/?results=10&inc=name,dob';
  const rawData = await fetchData(url);
  const data = rawData.results.map(({ name, dob }) => ({
    name: `${name.first} ${name.last}`,
    age: new Date().getFullYear() - new Date(dob.date).getFullYear(),
  }));

  const processedData = processData(data);

  const mappedData = processedData.map(({ name, age }) =>
    `Name: ${name}, Age: ${age}`
  );

  print('Processed Users:', mappedData);
})();
