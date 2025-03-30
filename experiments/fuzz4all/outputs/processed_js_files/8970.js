 

 
function simulateAsyncOperation(data, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

 
async function displayUserInfo({ id, name, age }) {
    console.log(`User Info:
    ID: ${id}
    Name: ${name}
    Age: ${age}`);
}

 
async function main() {
    try {
         
        const [user, product] = await Promise.all([
            simulateAsyncOperation({ id: 1, name: 'Alice', age: 30 }, 1000),
            simulateAsyncOperation({ id: 101, name: 'Laptop', price: 1200 }, 1500)
        ]);

         
        const { id: productId, name: productName, price } = product;
        console.log(`Product Info:
    ID: ${productId}
    Name: ${productName}
    Price: $${price}`);

         
        await displayUserInfo(user);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
main();
