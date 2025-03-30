 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { userId: 1, username: 'JohnDoe', email: 'john@example.com' };
            resolve(data);
        }, 1000);
    });
};

 
const loggingHandler = {
    get: (target, property) => {
        print(`Property '${property}' has been accessed.`);
        return Reflect.get(target, property);
    }
};

 
(async () => {
    try {
         
        const data = await fetchData();

         
        const proxyData = new Proxy(data, loggingHandler);

         
        const { userId, username = 'Unknown', email = 'Not available' } = proxyData;
        
         
        const contact = proxyData.contactInfo?.phone ?? 'No phone available';

         
        const userTemplate = (strings, ...values) => {
            return strings.reduce((result, string, i) => {
                return `${result}${string}<strong>${values[i] || ''}</strong>`;
            }, '');
        };

         
        print(userTemplate`User ID: ${userId}\nUsername: ${username}\nEmail: ${email}\nContact: ${contact}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
