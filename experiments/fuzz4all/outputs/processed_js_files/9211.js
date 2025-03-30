 
 

async function fetchData(url) {
     
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function* idGenerator() {
     
    let id = 0;
    while (true) {
        yield ++id;
    }
}

const ids = idGenerator();

async function processData(url) {
    try {
        const data = await fetchData(url);

        const enhancedData = data.map(({ name, ...rest }) => {
             
            return {
                id: ids.next().value,
                displayName: `Mr./Ms. ${name}`,
                ...rest
            };
        });

        return enhancedData;
    } catch (error) {
        console.error("Error processing data:", error);
        throw error;
    }
}

(async () => {
    const dataURL = 'https://jsonplaceholder.typicode.com/users';  
    const data = await processData(dataURL);

    const userMap = new Map();

    data.forEach(user => {
         
        userMap.set(user.id, user);
    });

     
    for (let [id, user] of userMap.entries()) {
        print(`User ID: ${id}, Name: ${user.displayName}`);
    }
})();
