 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, name: 'John Doe', age: 28 });
        }, 1000);
    });
};

 
const displayData = async () => {
    try {
        const data = await fetchData();
        
         
        const { id, name, age } = data;
        
         
        const extendedData = { ...data, country: 'USA', occupation: 'Developer' };

        print(`ID: ${id}, Name: ${name}, Age: ${age}`);
        print('Extended Data:', extendedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    await displayData();
})();
