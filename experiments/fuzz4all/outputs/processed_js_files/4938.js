 

 
const fetchData = async () => {
     
    await new Promise(resolve => setTimeout(resolve, 1000));

     
    return [
        { id: 1, name: 'Alice', age: 28, role: 'Developer' },
        { id: 2, name: 'Bob', age: 35, role: 'Designer' },
        { id: 3, name: 'Charlie', age: 25, role: 'Manager' }
    ];
};

 
(async () => {
    try {
         
        const users = await fetchData();

         
        const roles = users
            .map(({ role }) => role)  
            .filter((value, index, self) => self.indexOf(value) === index);  

         
        const createGreeting = (name) => (role) => `Hello, ${name}! Your role is ${role}.`;

         
        const greetings = users.map(({ name, role }) => {
            const greet = createGreeting(name);
            return greet(role);
        });

         
        print('Unique Roles:', roles);
        print('Greetings:', greetings);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
