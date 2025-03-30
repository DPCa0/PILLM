 
function sql(strings, ...values) {
  return strings.reduce((prev, curr, i) => prev + curr + (values[i] !== undefined ? `'${values[i]}'` : ''), '');
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  
   
  const validator = {
    get(target, prop) {
      if (!(prop in target)) {
        throw new ReferenceError(`Property "${prop}" does not exist.`);
      }
      return target[prop];
    }
  };

  return new Proxy(data, validator);
}

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    
     
    const query = sql`SELECT name, email FROM users WHERE id = ${data.id}`;

     
    const { name, email } = data;
    print(query);   
    print(`User: ${name}, Email: ${email}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
