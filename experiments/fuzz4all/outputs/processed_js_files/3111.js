 
const fs = require('fs').promises;

 
(async function complexFunction() {
    try {
         
        const user = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            preferences: {
                notifications: true,
                newsletter: false
            }
        };

         
        const { name, preferences: { notifications } } = user;

         
        const customTag = (strings, ...values) => strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
        print(customTag`User ${name} has notifications set to: ${notifications}`);

         
        await fs.writeFile('user.json', JSON.stringify(user, null, 2));
        const data = await fs.readFile('user.json', 'utf8');

         
        const savedUser = { ...JSON.parse(data), lastLogin: new Date() };
        
         
        print(savedUser?.preferences?.newsletter ?? 'Newsletter preference is not set');

         
        const handler = {
            set(target, prop, value) {
                if (prop === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                    throw new Error('Invalid email address');
                }
                target[prop] = value;
                return true;
            }
        };

        const proxyUser = new Proxy(savedUser, handler);
        proxyUser.email = 'newemail@example.com';  

         
         

        print(proxyUser);

    } catch (error) {
        console.error('Error:', error);
    }
})();
