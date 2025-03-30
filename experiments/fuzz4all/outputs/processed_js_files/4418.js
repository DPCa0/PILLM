 

 
function* fetchData() {
  const url = 'https://api.example.com/data';

   
  const promise1 = fetch(url).then(response => response.json());
  const data1 = yield promise1;

  print('First fetch result:', data1);

   
  const promise2 = fetch(`${url}/more`).then(response => response.json());
  const data2 = yield promise2;

  print('Second fetch result:', data2);

  return `Final result combining both: ${JSON.stringify({ ...data1, ...data2 })}`;
}

 
async function runGenerator(gen) {
  const generator = gen();

  const process = async result => {
    if (!result.done) {
      const data = await result.value;
      return process(generator.next(data));
    } else {
      return result.value;
    }
  };

  return process(generator.next());
}

 
(async () => {
  try {
    const finalResult = await runGenerator(fetchData);
    print(finalResult);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
