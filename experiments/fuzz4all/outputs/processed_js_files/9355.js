const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ id, name, age }) => ({
  id,
  name: name.toUpperCase(),
  ageCategory: age < 18 ? 'Minor' : 'Adult',
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const generateReports = async (urls) => {
  const results = await Promise.allSettled(urls.map(url => fetchData(url)));
  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => processData(result.value));
};

const urls = [
  'https://api.example.com/user/1',
  'https://api.example.com/user/2',
  'https://api.example.com/user/3',
];

(async () => {
  try {
    const reports = await generateReports(urls);
    print('Reports:', reports);
    await delay(3000);
    print('Process completed after delay');
  } catch (error) {
    console.error('Error:', error);
  }
})();
