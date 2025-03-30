 
 

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function* dataProcessor(data) {
    for (const item of data) {
        const { id, title } = item;
        yield `Post ID: ${id}, Title: ${title}`;
    }
}

async function displayPosts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const data = await fetchData(url);
        
         
        const processor = dataProcessor(data);
        for (const processedData of processor) {
            print(processedData);
        }
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
    }
}

displayPosts();
