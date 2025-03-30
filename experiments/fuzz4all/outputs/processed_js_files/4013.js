 

const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { name: "Advanced JavaScript", year: 2023 } });
    }, 1000);
  });
};

const processData = async (url) => {
  try {
    const { data: { name, year } } = await fetchData(url);
    return { name, year, message: `Data fetched successfully for ${name} (${year})` };
  } catch (error) {
    throw new Error('Error processing data');
  }
};

const logData = async (url) => {
  const handler = {
    get: (obj, prop) => {
      return prop in obj ? obj[prop] : `Property ${prop} not found`;
    }
  };

  try {
    const data = await processData(url);
    const proxyData = new Proxy(data, handler);
    print(`Result: ${proxyData.message}`);
  } catch (error) {
    console.error(error.message);
  }
};

logData('https://example.com/data');
