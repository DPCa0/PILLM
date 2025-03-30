 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  const apiData = await Promise.all([
    fetch('https://api.example.com/data1').then(res => res.json()),
    fetch('https://api.example.com/data2').then(res => res.json())
  ]);

  const [data1, data2] = apiData;
  return { data1, data2 };
}

 
function* generateSequence() {
  yield* [1, 2, 3, 4];
}

 
(async () => {
  try {
     
    const numbers = [...generateSequence(), 5, 6];
    const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
    print(`Sum of numbers: ${sum(...numbers)}`);

     
    print('Fetching data...');
    const { data1, data2 } = await fetchData();
    print('Fetched data:', { data1, data2 });

    await delay(1000);
    print('Operations completed!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
