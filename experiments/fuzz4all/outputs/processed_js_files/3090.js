 

 
const fetchData = (data) => new Promise((resolve) => {
  setTimeout(() => resolve(data), 1000);
});

 
async function processData() {
  const data = await fetchData({ name: 'Alice', age: 30, profession: 'Developer' });
  print('Data fetched:', data);
  
   
  const validator = {
    set(target, key, value) {
      if (key === 'age' && typeof value !== 'number') {
        throw new Error('Age must be a number');
      }
      target[key] = value;
      return true;
    }
  };

  const user = new Proxy(data, validator);

   
  const professions = new Set();
  professions.add(user.profession);

   
  try {
    user.age = 'thirty';  
  } catch (error) {
    console.error('Error:', error.message);
  }

   
  print('Updated User:', user);
  print('Unique Professions:', [...professions]);
}

 
(async () => {
  await processData();
})();
