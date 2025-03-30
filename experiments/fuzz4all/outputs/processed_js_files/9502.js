 

 
async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve({ data: 'Sample data from ' + url });
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
}

 
function* urlGenerator(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
async function processUrls(urls) {
    const results = [];

     
    for (const request of urlGenerator(urls)) {
        try {
            const response = await request;
            results.push(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

     
    const uniqueResults = new Set(results);

     
    return [...uniqueResults];
}

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data1'];

 
processUrls(urls)
    .then(uniqueData => console.log('Processed Data:', uniqueData))
    .catch(error => console.error('Processing Error:', error));
