const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return new Proxy(data, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      } else {
        console.warn(`Property ${prop} doesn't exist on target`);
        return undefined;
      }
    },
  });
};

const manipulateData = (data) => {
  const uniqueValues = [...new Set(data.map(item => item.value))];
  return uniqueValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
};

const displayResult = (result) => {
  console.table(result);
  const entries = Object.entries(result).map(([key, value]) => `${key}: ${value}`).join(', ');
  print(`Formatted Result: { ${entries} }`);
};

(async () => {
  const rawData = await fetchData('https: 
  if (rawData) {
    const proxyData = processData(rawData);
    const result = manipulateData(proxyData);
    displayResult(result);
  }
})();
