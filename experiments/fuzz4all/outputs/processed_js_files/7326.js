 

const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: 'Complex Data' }), 1000);
});

const processData = async ({ data }) => {
  await new Promise(r => setTimeout(r, 500));  
  print(`Processed: ${data}`);
};

function* generatorExample() {
  yield 'First value';
  yield 'Second value';
  return 'All done';
}

(async () => {
   
  const { data } = await fetchData();
  
   
  await processData({ data });

   
  const gen = generatorExample();
  print(gen.next().value);  
  print(gen.next().value);  
  print(gen.next().value);  

   
  const promiseChain = Promise.resolve()
    .then(() => console.log('Step 1'))
    .then(() => print('Step 2'));

  await promiseChain;

  print('Finished all async tasks');
})();
