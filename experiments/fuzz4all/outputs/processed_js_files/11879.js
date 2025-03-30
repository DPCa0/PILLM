 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ user: { name: 'Alice', age: 30 }, items: ['Book', 'Pen', 'Notebook'] }), 1000);
});

 
const processData = async () => {
    try {
        const { user, items } = await fetchData();  
        const { name, age } = user;
        const message = `Hello, ${name}! You have ${items.length} items.`;

        const transformedItems = items
            .map(item => `${item} (${name}'s)`) // Higher-order function (map)
            .reduce((acc, item) => `${acc}, ${item}`); // Higher-order function (reduce)

        print(message);
        print(`Items: ${transformedItems}`);

        const extraItems = ['Pencil', 'Eraser'];
        const allItems = [...items, ...extraItems]; // Spread operator

        print(`All Items: ${allItems.join(', ')}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

 
processData();
