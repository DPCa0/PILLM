 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

function* processItems(items) {
    for (const item of items) {
         
        const { userId, id, title, completed } = item;
        
         
        yield {
            userId,
            taskId: id,
            title,
            status: completed ? 'Completed' : 'Pending',
        };
    }
}

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
        
         
        const itemGenerator = processItems(data);

         
        const processedData = Array.from(itemGenerator).filter(({ status }) => status === 'Completed');

         
        print(...processedData);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
