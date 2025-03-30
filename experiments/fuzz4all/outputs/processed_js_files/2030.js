 
async function fetchAndProcessData(url) {
    try {
         
        let response = await fetch(url);
        
         
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
         
        let data = await response.json();
        
         
        let { userId, id, title } = data;

         
        print(`User ID: ${userId}, ID: ${id}, Title: ${title}`);

         
        let processedData = await Promise.all([
            processTitle(title),
            processId(id)
        ]);

         
        print('Processed Data:', ...processedData);

    } catch (error) {
         
        console.error('Error fetching or processing data:', error);
    }
}

 
function processTitle(title) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Title Processed: ${title.toUpperCase()}`);
        }, 1000);
    });
}

 
function processId(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`ID Processed: ${id * 10}`);
        }, 500);
    });
}

 
fetchAndProcessData('https://jsonplaceholder.typicode.com/posts/1');
