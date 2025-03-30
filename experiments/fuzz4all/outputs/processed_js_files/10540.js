 

(async () => {
   
  function* asyncGenerator() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    yield delay(1000).then(() => 'First step completed');
    yield delay(2000).then(() => 'Second step completed');
    yield delay(3000).then(() => 'Third step completed');
  }

   
  const runAsyncSequence = async (...[gen]) => {
    for (let promise of gen) {
      const result = await promise;
      print(result);
    }
  };

   
  await runAsyncSequence([...asyncGenerator()]);
})();
