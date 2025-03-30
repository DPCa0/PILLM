 
const fetchData = async (url) => {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const { title, body } = data;
    return { title, body };

  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  },
};

const watchedObject = new Proxy({}, handler);

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const generator = numberGenerator();

 
(async () => {
   
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');

   
  watchedObject.title = data.title;
  watchedObject.body = data.body;

   
  print(`Title: ${watchedObject.title}`);
  print(`Body: ${watchedObject.body}`);

   
  for (let i = 0; i < 5; i++) {
    print(`Generated number: ${generator.next().value}`);
  }
})();
