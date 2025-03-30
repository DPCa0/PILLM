 
async function fetchData() {
     
    const dataPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['apple', 'banana', 'cherry']);
        }, 2000);
    });
    
     
    const data = await dataPromise;
    return data;
}

 
(async () => {
    try {
         
        const fruits = await fetchData();
        
         
        const fruitMessages = fruits.map((fruit, index) => {
            const [firstLetter, ...rest] = fruit;
            const capitalizedFruit = [firstLetter.toUpperCase(), ...rest].join('');
            return `${index + 1}: ${capitalizedFruit}`;
        });
        
         
        const formatMessage = (strings, ...values) => 
            strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
        
        const message = formatMessage`Fetched Fruits: 
        ${fruitMessages.join(', ')}
        - End of List -`;
        
         
        console?.log(message ?? "No message available");
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
