 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
}

const processData = async () => {
  try {
    const { results: [firstResult] } = await fetchData('https://api.example.com/data');
    const { id, name, attributes: { age, location } } = firstResult;

    print(`User ID: ${id}`);
    print(`Name: ${name}`);
    print(`Age: ${age}`);
    print(`Location: ${location}`);
    
     
    const user = new Proxy(firstResult, {
      get(target, prop) {
        print(`Property '${prop}' accessed.`);
        return target[prop];
      }
    });

    print(user.name);   
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
};

processData();
