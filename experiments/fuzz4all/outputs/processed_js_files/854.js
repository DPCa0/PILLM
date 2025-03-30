 
 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function processItems(items) {
    return items.map(({ id, name, price }) => ({ id, name, price: price.toFixed(2) }));
}

function formatOutput(strings, ...values) {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

async function main() {
    try {
        const dataUrl = 'https://api.example.com/products';
        const rawItems = await fetchData(dataUrl);
        
         
        const processedItems = processItems(rawItems);
        
         
        processedItems.forEach(item => {
            print(formatOutput`Product ID: ${item.id}, Name: ${item.name}, Price: $${item.price}`);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
