 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
};

const processData = (data) => {
  const { name, details: { age, address }, ...rest } = data;
  const modifiedData = {
    fullName: `${name.first} ${name.last}`,
    ageInDecades: Math.floor(age / 10),
    address,
    rest
  };
  return modifiedData;
};

const logData = ({ fullName, ageInDecades, address, rest }) => {
  print(`Name: ${fullName}`);
  print(`Age in decades: ${ageInDecades}`);
  print(`Address: ${address.city}, ${address.country}`);
  print(`Additional Info:`, { ...rest });
};

(async () => {
  const url = 'https://api.example.com/user/1';
  const userData = await fetchData(url);
  if (userData) {
    const processedData = processData(userData);
    logData(processedData);
  }
})();
