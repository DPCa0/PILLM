 
async function fetchAndProcessUserData() {
    try {
         
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');
        
        let users = await response.json();

         
        let usernames = users
            .filter(({address: {geo: {lat}}}) => parseFloat(lat) > 0)  
            .map(({username, address: {city}}) => ({username, city}))   
            .reduce((acc, {username, city}) => {
                acc.push(`${username} (${city})`);  
                return acc;
            }, []);

         
        print(`Users from the northern hemisphere:\n${usernames.join('\n') || 'No users found'}`);
    } catch (error) {
        console.error('Failed to fetch or process data:', error);
    }
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Called function ${target.name} with arguments: ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

const proxiedFetchAndProcessUserData = new Proxy(fetchAndProcessUserData, handler);

 
(async () => {
    await proxiedFetchAndProcessUserData();
})();
