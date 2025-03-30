 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                userId: 1,
                id: 101,
                title: "delectus aut autem",
                completed: false
            };
            resolve(data);
        }, 1000);
    });
}

 
async function getData() {
    try {
         
        const { title, ...otherData } = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        
         
        const fullData = { title, ...otherData };

         
        const dataProxy = new Proxy(fullData, {
            get: (target, property) => {
                print(`Property "${property}" accessed with value: ${target[property]}`);
                return target[property];
            }
        });

         
        print(`Title: ${dataProxy.title}`);
        print(`UserId: ${dataProxy.userId}`);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
getData();
