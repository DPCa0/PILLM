 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
   
  await delay(1000);
  return [
    { id: 1, name: 'Alice', job: 'Engineer' },
    { id: 2, name: 'Bob', job: 'Designer' },
    { id: 3, name: 'Charlie', job: 'Teacher' }
  ];
}

async function processData() {
  const data = await fetchData();

   
  const mappedData = new Map(data.map(({ id, name, job }) => {
    return [id, { name, job, email: `${name.toLowerCase()}@example.com` }];
  }));

   
  for (let [id, { name, job, email }] of mappedData.entries()) {
    print(`ID: ${id}, Name: ${name}, Job: ${job}, Email: ${email}`);
  }
}

processData()
  .then(() => console.log('Data processed successfully'))
  .catch(error => console.error('Error processing data:', error));
