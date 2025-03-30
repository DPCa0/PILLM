 
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https: 
        if (!response.ok) throw new Error('Network response was not ok');
        
        const userData = await response.json();
        
         
        const { name, email, address: { city } } = userData;
        
        print(`Name: ${name}\nEmail: ${email}\nCity: ${city}`);
        
         
        print(formatUserDetails`User Details: \nName: ${name}\nEmail: ${email}\nCity: ${city}`);
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

 
function formatUserDetails(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? `<strong>${values[i]}</strong>` : '');
    }, '');
}

 
const target = {
    userId: 1
};

const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy(target, handler);

 
async function getAllUsersData(userIds) {
    const userPromises = userIds.map(id => fetchUserData(id));
    await Promise.all(userPromises);
}

 
proxy.userId = 5;
getAllUsersData([proxy.userId, 2, 3]);
