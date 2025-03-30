 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({ user: 'Alice', age: 30, location: 'Wonderland' });
    }, 1000);
});

 
async function processData() {
    try {
        const { user, age, location } = await fetchData();
        
         
        const extendedData = { ...{ user, age, location }, hobby: 'adventuring' };

         
        const dataKeys = Object.keys(extendedData).map(key => key.toUpperCase());

         
        const uniqueChars = new Set([...user]);

        print(`User: ${user} is ${age} years old, located in ${location}.`);
        print(`Extended Data:`, extendedData);
        print(`Data Keys:`, dataKeys);
        print(`Unique Characters in User:`, [...uniqueChars]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
processData();
