 

 
const fetchData = (delay, data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (data) {
      resolve({ data, status: 'success' });
    } else {
      reject({ error: 'No data', status: 'failure' });
    }
  }, delay);
});

 
async function getData() {
  try {
    const { data, status } = await fetchData(2000, { message: 'Hello, advanced JavaScript!' });
    print(`Status: ${status}, Message: ${data.message}`);
  } catch ({ error, status }) {
    console.error(`Status: ${status}, Error: ${error}`);
  }
}

 
(async () => {
  print('Fetching data...');
  await getData();
  print('Done!');
})();
