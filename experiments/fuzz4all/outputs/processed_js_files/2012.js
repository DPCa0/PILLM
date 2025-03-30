 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess() {
    print("Fetching data...");
    await delay(1000);  

     
    const data = {
        users: [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 3, name: 'Charlie' },
        ],
        meta: { page: 1, total: 3 }
    };
    const { users, meta: { total } } = data;

    print(`Total users: ${total}`);

     
    const userNames = new Set([...users.map(u => u.name), 'Alice', 'Dave']);
    
     
    print("Unique user names:");
    for (const name of userNames) {
        print(`- ${name}`);
    }

     
    const greetings = users.map(({ name }) => `Hello, ${name}!`);

     
    (async () => {
        for (const greet of greetings) {
            await delay(500);
            print(greet);
        }
    })();
}

 
fetchDataAndProcess();
