 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'validURL') {
                resolve({ data: { id: 1, name: 'John Doe', age: 30 }, status: 200 });
            } else {
                reject({ error: 'Invalid URL', status: 404 });
            }
        }, 1000);
    });
}

 
async function processUserData(url) {
    try {
         
        const { data: { id, name, age }, status } = await fetchData(url);

        if (status === 200) {
             
            const user = {
                id,
                name,
                age,
                info() {
                    return `User: ${this.name}, Age: ${this.age}`;
                }
            };

            print(user.info());
        }
    } catch ({ error, status }) {
         
        console.error(`Error (${status}): ${error}`);
    }
}

 
processUserData('validURL');

 
processUserData('invalidURL');
