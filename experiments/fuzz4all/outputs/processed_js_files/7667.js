 
async function processData(...urls) {
  try {
    const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
    const results = await Promise.all(fetchPromises);

    for (const { id, title, body } of results) {
      print(`Post ID: ${id}\nTitle: ${title}\nBody: ${body}\n---`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const dataHandler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return prop in obj ? obj[prop] : 'Property not found';
  }
};

const myData = new Proxy({
  name: 'Advanced JavaScript',
  version: 'ES2023'
}, dataHandler);

 
print(myData.name);
print(myData.version);
print(myData.author);

 
processData('https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2');
