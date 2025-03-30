 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { id: 1, name: 'John Doe', age: 28, hobbies: ['reading', 'coding', 'hiking'] };
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' has been accessed.`);
        return prop in target ? target[prop] : `Property '${prop}' does not exist.`;
    }
};

 
(async function main() {
    try {
         
        const userData = await fetchData();

         
        const { name, age, hobbies: [firstHobby, ...otherHobbies] } = userData;
        print(`User: ${name}, Age: ${age}`);
        print(`First Hobby: ${firstHobby}`);
        print(`Other Hobbies: ${otherHobbies.join(', ')}`);

         
        const userClone = { ...userData };

         
        const proxiedUser = new Proxy(userClone, handler);

         
        print(`Accessing name: ${proxiedUser.name}`);
        print(`Accessing non-existing property: ${proxiedUser.nonExistent}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
