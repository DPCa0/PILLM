 

const fetchData = async (url) => {
  try {
     
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.2 ? resolve({ data: { results: [1, 2, 3, 4, 5] } }) : reject('Fetch error');
      }, 1000);
    });

     
    const { data: { results } } = response;
    
     
    const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
    print(`Sum of results: ${sum(...results)}`);

     
    const squared = await Promise.all(results.map(async (num) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(num * num), 500);
      });
    }));

    print(`Squared results: ${squared}`);

  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
fetchData('https://api.example.com/data');
