 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

 
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : `Property "${prop}" not found`;
  }
};

 
function* objectEntries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

(async () => {
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');

   
  const proxyData = new Proxy(apiData, handler);

   
  const { title, body, ...rest } = proxyData;
  print(`Title: ${title}\nBody: ${body}`);

   
  for (let [key, value] of objectEntries(rest)) {
    print(`${key}: ${value}`);
  }
})();
