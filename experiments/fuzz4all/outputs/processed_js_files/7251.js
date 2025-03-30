 
async function complexOperation(url) {
   
  const response = await fetch(url);
  const data = await response.json();

   
  const { title, body } = data;

   
  return `Title: ${title}\nBody: ${body}`;
}

 
function withLogging(callback) {
  return async function (...args) {
    print("Operation started");
    const result = await callback(...args);
    print("Operation finished");
    return result;
  };
}

 
const urls = [...new Set(["https://jsonplaceholder.typicode.com/posts/1", "https://jsonplaceholder.typicode.com/posts/2"])];

 
(async () => {
  const processOperation = withLogging(complexOperation);

   
  const results = await Promise.all(urls.map(url => processOperation(url)));
  
   
  results.forEach(result => print(result));
})();
