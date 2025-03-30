 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;  
            if (success) {
                resolve({ id: 1, name: 'Alice', age: 25, location: { city: 'Wonderland', country: 'Imagination' } });
            } else {
                reject(new Error('Failed to fetch data'));
            }
        }, 1000);
    });
};

 
const processUserData = async () => {
    try {
        const { name, age, location: { city, country } } = await fetchData();
        const displayInfo = `User: ${name}, Age: ${age}, Location: ${city}, ${country}`;

         
        const { default: fancyLog } = await import('./fancyLog.js');
        fancyLog(displayInfo);
    } catch (error) {
        console.error('Error:', error);
    }
};

 
(async () => {
    await processUserData();
})();

 
 
 
 

Please make sure to have a file named `fancyLog.js` with the content described in the comment at the bottom of the code for it to work correctly.