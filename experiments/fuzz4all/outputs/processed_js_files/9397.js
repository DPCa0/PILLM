 
async function fetchData() {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                { id: 1, name: "Alice", value: 42 },
                { id: 2, name: "Bob", value: 36 },
                { id: 3, name: "Charlie", value: 27 }
            ];
            resolve(data);
        }, 1000);
    });
}

 
async function processData() {
    try {
        const data = await fetchData();
        
         
        const totalValue = data
            .filter(item => item.value > 30)  
            .map(item => ({ ...item, value: item.value * 2 }))  
            .reduce((acc, item) => acc + item.value, 0);  

        print(`Total value of filtered and transformed data: ${totalValue}`);
    } catch (error) {
        console.error("Error processing data:", error);
    }
}

 
const [x, y, z] = [1, 2, 3];

 
print(`Destructured values: x = ${x}, y = ${y}, z = ${z}`);

 
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

print("Spread operator result:", obj2);

 
(function() {
    print("This code is executed immediately!");
})();

 
processData();
