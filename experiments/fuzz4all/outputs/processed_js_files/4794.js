 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve([
            { name: 'Alice', age: 30 },
            { name: 'Bob', age: 25 },
            { name: 'Charlie', age: 35 }
        ]);
    }, 1000);
});

 
const processUserData = async () => {
    try {
         
        const data = await fetchData();

         
        const processedData = data.map(({ name, age }) => ({
            name: name.toUpperCase(),
            ageCategory: age > 30 ? 'Senior' : 'Junior'
        }));

         
        print(processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    await processUserData();
})();
