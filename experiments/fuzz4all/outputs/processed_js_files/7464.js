 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

         
        const { user: { name, email }, items } = data;

         
        const processedItems = items
            .filter(item => item.isActive)
            .map(({ id, value }) => ({ id, value: value * 2 }));

         
        print(`User: ${name} (${email})`);
        print('Processed Items:', processedItems);

         
        const uniqueValues = new Set(processedItems.map(item => item.value));
        print('Unique Values:', Array.from(uniqueValues));

         
        const iterableObject = {
            *[Symbol.iterator]() {
                for (const item of processedItems) {
                    yield item;
                }
            }
        };

         
        print('Iterating over processed items:');
        for (const item of iterableObject) {
            print(item);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
fetchData('https://api.example.com/data');
