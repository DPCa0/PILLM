 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
     
    const [url, ...rest] = [
        'https://jsonplaceholder.typicode.com/posts',
        'extraParam1',
        'extraParam2'
    ];

    print(`Fetching data from: ${url}, ignoring: ${rest.join(', ')}`);

     
    const response = await fetch(url);
    const data = await response.json();

     
    const [{ id, title }] = data;

     
    print(`Fetched Post - ID: ${id}, Title: ${title}`);

     
    const nonExistentProperty = data[0]?.nonExistentProperty ?? 'Default Value';
    print(`Non-existent property: ${nonExistentProperty}`);

     
    await Promise.all([delay(1000), delay(2000), delay(3000)]);
    print('Delays completed, ending function.');
}

 
fetchData()
    .then(() => console.log('Data fetch process completed.'))
    .catch(err => console.error('Error:', err));
