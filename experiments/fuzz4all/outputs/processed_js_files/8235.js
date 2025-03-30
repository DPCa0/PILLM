 

 
(async () => {
   
  function createCounter() {
    let count = 0;
    return {
      increment() {
        count += 1;
        return count;
      },
      get value() {
        return count;
      },
    };
  }

   
  function fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { user: 'Jane Doe', age: 30 } });
      }, 1000);
    });
  }

   
  async function getUserData() {
    try {
      const response = await fetchData();
      const { data: { user, age } } = response;  
      return { user, age };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  const counter = createCounter();
  
   
  async function main() {
    print(`Counter: ${counter.increment()}`);  
    const { user, age } = await getUserData();
    print(`User: ${user}, Age: ${age}`);
    print(`Counter: ${counter.increment()}`);  
  }

   
  main();

   
  print(`Initial Counter: ${counter.value}`);  
})();
