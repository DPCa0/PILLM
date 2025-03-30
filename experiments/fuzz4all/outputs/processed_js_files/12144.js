 
async function fetchData() {
     
    const simulateApiCall = () => new Promise(resolve => {
        setTimeout(() => resolve({ user: { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com' } }), 1000);
    });

    try {
         
        const response = await simulateApiCall();
        
         
        const { user: { id, name, email } } = response;

         
        const userInfo = { id, name, email };
        print(`User Info: ${JSON.stringify(userInfo, null, 2)}`);

         
        const { processUser } = await import('./userProcessor.js');
        processUser(userInfo);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

 
export function processUser({ id, name, email }) {
    print(`Processing user - ID: ${id}, Name: ${name}, Email: ${email}`);
}

**Note:** For this code to run properly, you need to have a `userProcessor.js` module file that exports a `processUser` function.