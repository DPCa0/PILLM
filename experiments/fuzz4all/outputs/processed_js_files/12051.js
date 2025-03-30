 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            user: { name: 'Alice', age: 30 },
            items: [
                { id: 1, name: 'Item 1', price: 100 },
                { id: 2, name: 'Item 2', price: 200 }
            ]
        });
    }, 1000);
});

 
const formatCurrency = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

 
const processData = async () => {
    try {
        const { user: { name, age }, items } = await fetchData();

        print(`User: ${name}, Age: ${age}`);
        print('Items purchased:');
        
        items.forEach(({ name, price }) => {
            print(`- ${name}: ${formatCurrency(price)}`);
        });

        const total = items.reduce((sum, { price }) => sum + price, 0);
        print(`Total: ${formatCurrency(total)}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
processData();
