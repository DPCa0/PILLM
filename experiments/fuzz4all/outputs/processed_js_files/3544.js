 

const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {   
      resolve(`Data from ${url}`);
    } else {
      reject(`Error fetching data from ${url}`);
    }
  }, 1000);
});

async function* dataGenerator(urls) {
  for (let url of urls) {
    try {
      const data = await fetchData(url);
      yield { status: 'fulfilled', value: data };
    } catch (error) {
      yield { status: 'rejected', reason: error };
    }
  }
}

(async () => {
  const urls = ['https://api.example1.com', 'https://api.example2.com', 'https://api.example3.com'];
  const results = [];
  
  for await (let result of dataGenerator(urls)) {
    results.push(result);
  }
  
  const [successes, failures] = results.reduce(([succ, fail], result) => {
    result.status === 'fulfilled' ? succ.push(result.value) : fail.push(result.reason);
    return [succ, fail];
  }, [[], []]);
  
  print('Successful fetches:', successes);
  print('Failed fetches:', failures);
})();
