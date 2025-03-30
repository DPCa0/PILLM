 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const uniqueData = new Set();

 
async function processData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);

    if (!data) return;

     
    const transformedData = data.map(item => {
        uniqueData.add(item.userId);
        return { ...item, titleLength: item.title.length };
    });

     
    const { length: totalPosts } = transformedData;
    print(`Total Posts: ${totalPosts}, Unique Users: ${uniqueData.size}`);

     
    console.table(transformedData.slice(0, 3));
}

 
processData();
