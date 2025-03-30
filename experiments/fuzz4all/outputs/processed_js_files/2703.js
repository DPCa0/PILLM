 
const fetchUserData = async ({ userId }) => {
    const response = await fetch(`https: 
    const userData = await response.json();
    return userData;
};

 
const userProxyHandler = {
    set: (obj, prop, value) => {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        obj[prop] = value;
        return true;
    }
};

const user = new Proxy({}, userProxyHandler);

 
function* numberGenerator(limit) {
    let num = 0;
    while (num < limit) {
        yield num++;
    }
}

 
(async () => {
    try {
         
        const users = [1, 2, 3];
        const userPromises = users.map(userId => fetchUserData({ userId }));
        const userData = await Promise.all(userPromises);

         
        Object.assign(user, ...userData);

         
        user.age = 25;  

        print('User Data:', user);

         
        const limit = 5;
        const numbers = [...numberGenerator(limit)];
        print('Generated Numbers:', numbers);

    } catch (error) {
        console.error('Error:', error);
    }
})();
