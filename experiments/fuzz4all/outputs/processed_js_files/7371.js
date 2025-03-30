 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

 
const processUserData = (userData) => {
    const { name, email, address: { city }, ...rest } = userData;
    console.log(`User Info: 
        Name: ${name}
        Email: ${email}
        City: ${city}
        Other Info: ${JSON.stringify(rest, null, 2)}`);
};

 
const uniqueIds = new Set([1, 2, 3, 3, 4]);

 
class Utils {
    static logUniqueIds() {
        print('Unique IDs:', [...uniqueIds].join(', '));
    }
}

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    const userData = await fetchData(url);
    
    if (userData) {
        processUserData(userData);
    }

    Utils.logUniqueIds();
})();
