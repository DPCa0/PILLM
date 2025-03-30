 
 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             
            const data = { user: 'John Doe', id: 12345 };
            resolve(data);
        }, 2000);
    });
};

const processUser = async () => {
    try {
        const url = 'https://api.example.com/user';
        const user = await fetchData(url);
        
         
        const { user: userName, id: userId } = user;
        
         
        const userProxy = new Proxy(user, {
            get: (target, prop) => {
                return prop in target ? target[prop] : `No such property: ${prop}`;
            }
        });

        print(`Processing data for user: ${userProxy.user}`);
        
         
        print(`User Details:\nName: ${userName}\nID: ${userId}`);
        
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
};

processUser();
