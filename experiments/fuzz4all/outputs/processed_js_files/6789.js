 

 
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

 
const apiUrl = 'https://randomuser.me/api/';

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property "${prop}"`);
            return target[prop];
        } else {
            console.error(`Property "${prop}" not found`);
        }
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const userSet = new Set();
const proxiedSet = new Proxy(userSet, handler);

(async () => {
    try {
         
        const data = await fetchData(apiUrl);
        const user = data.results[0];
        const userName = `${user.name.first} ${user.name.last}`;
        
         
        proxiedSet.add(userName);
        
         
        proxiedSet.forEach(user => print(`User: ${user}`));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
