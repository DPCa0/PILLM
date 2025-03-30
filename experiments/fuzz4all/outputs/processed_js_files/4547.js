 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);  
  const data = { userId: 1, title: 'JavaScript Complexity', content: 'Advanced features demonstration' };
  print('Data fetched:', data);
  return data;
}

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

 
async function main() {
  try {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);

     
    const { userId, title, content } = proxiedData;
    print(`User (${userId}): ${title}`);
    print(`Content: ${content}`);

     
    Promise.resolve(data)
      .then(d => {
        print('Processing data...');
        return { ...d, processed: true };  
      })
      .then(d => {
        print('Processed Data:', d);
      });

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
main();
