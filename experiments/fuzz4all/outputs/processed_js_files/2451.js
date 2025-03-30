 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: "Fetched data from " + url });
      } else {
        reject("URL not provided");
      }
    }, 1000);
  });
};

 
const processData = async (url) => {
  try {
    const response = await fetchData(url);
    return `Processed: ${response.data.toUpperCase()}`;
  } catch (error) {
    return `Error: ${error}`;
  }
};

 
(async () => {
   
  const [url1 = "http://example.com", url2 = ""] = ["http://api.example.com"];

   
  const resultsMap = new Map();

   
  await Promise.all([
    processData(url1).then(result => resultsMap.set(url1, result)),
    processData(url2).then(result => resultsMap.set(url2, result)),
  ]);

   
  for (const [url, result] of resultsMap.entries()) {
    print(`${url}: ${result}`);
  }

   
  const obj = { a: 1, b: 2, c: 3 };
  const newObj = { ...obj, d: 4 };
  print(Object.entries(newObj));

   
  const tag = (strings, ...values) => strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
  const name = 'World';
  print(tag`Hello, ${name}! Welcome to ${'JavaScript'}.`);
})();
