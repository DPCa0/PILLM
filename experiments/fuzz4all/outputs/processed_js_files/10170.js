const axios = require('axios');

 
async function fetchDataAndProcess() {
  try {
    const { data } = await axios.get('https://api.agify.io?name=michael');

     
    const age = data?.age ?? 'Unknown age';

     
    print(`The predicted age for the name "Michael" is ${age}`);

     
    const urls = [
      'https://api.agify.io?name=john',
      'https://api.agify.io?name=mary',
      'https://api.agify.io?name=lucy'
    ];

    const results = await Promise.allSettled(
      urls.map(url => axios.get(url))
    );

     
    results.forEach(({ status, value }, index) => {
      if (status === 'fulfilled') {
        const { name, age } = value.data;
        print(`Name: ${name}, Age: ${age}`);
      } else {
        console.error(`Request ${index + 1} failed`);
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  await fetchDataAndProcess();
})();
