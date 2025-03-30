 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

     
    let data = await response.json();

     
    let { userId, id, title, body } = data;
    
     
    print(`User ID: ${userId}`);
    print(`Post ID: ${id}`);
    print(`Title: ${title}`);
    print(`Body: ${body}`);
    
     
    print(highlight`Fetched post: ${title} with ID: ${id}`);
  } catch (error) {
     
    console.error(`Failed to fetch data: ${error.message}`);
  }
}

 
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}

 
(async () => {
   
  const handler = {
    apply: (target, thisArg, args) => {
      print(`Calling fetchData with arguments: ${JSON.stringify(args)}`);
      return Reflect.apply(target, thisArg, args);
    }
  };

  const proxiedFetchData = new Proxy(fetchData, handler);

   
  await proxiedFetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
