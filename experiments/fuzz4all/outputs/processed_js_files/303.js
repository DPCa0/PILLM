 
async function* fetchData(urls) {
  const responses = await Promise.all(urls.map(url => fetch(url)));
  for (const response of responses) {
    const data = await response.json();
    yield process(data);
  }
}

 
function process(data) {
  return data.map(item => ({
    ...item,
    processedValue: item.value * 2
  }));
}

 
const handler = {
  get(target, prop) {
    if (prop === 'averageValue') {
      const sum = target.reduce((acc, item) => acc + item.processedValue, 0);
      return sum / target.length;
    }
    return target[prop];
  }
};

 
function analyzeData([first, ...rest], ...args) {
  print('First processed item:', first);
  print('Rest of the items:', rest);
  print('Additional arguments:', args);
}

 
(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ];

  for await (const data of fetchData(urls)) {
    const proxiedData = new Proxy(data, handler);
    print('Processed Data:', proxiedData);
    print('Average Value:', proxiedData.averageValue);
    analyzeData(data, 'additional', 'info');
  }
})();
