 
const createMultiplier = (factor) => {
  return (number) => number * factor;
};

 
const { log, error } = console;

 
const multiplierMap = new Map();
multiplierMap.set('double', createMultiplier(2));
multiplierMap.set('triple', createMultiplier(3));

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  } catch (err) {
    error('Failed to fetch data:', err);
    return null;
  }
};

 
const calculateAndLog = (type, number) => {
  const multiplierFunction = multiplierMap.get(type);
  if (multiplierFunction) {
    const result = multiplierFunction(number);
    log(`The ${type} of ${number} is ${result}.`);
  } else {
    error(`Multiplier of type "${type}" not found.`);
  }
};

 
(async () => {
  calculateAndLog('double', 4);
  calculateAndLog('triple', 5);

  const data = await fetchData('https://api.example.com/data');
  if (data) log('Fetched data:', data);
})();
