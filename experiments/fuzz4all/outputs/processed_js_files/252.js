 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error: ', error);
  }
};

const processData = ({ results }) => {
  const processed = results.map(({ name: { first, last }, email }) => ({
    fullName: `${first} ${last}`,
    email
  }));
  return processed;
};

(async () => {
  const url = 'https://randomuser.me/api/?results=5';
  const data = await fetchData(url);

  if (data) {
    const processedData = processData(data);
    print('Processed Data:', processedData);

    const emails = processedData.map(({ email }) => email);
    print('Emails:', emails);

    const fullNamesSet = new Set(processedData.map(({ fullName }) => fullName));
    print('Unique Full Names:', [...fullNamesSet]);
  }
})();
