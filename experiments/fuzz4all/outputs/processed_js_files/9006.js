 
(async function complexExample() {
     
    const urls = [
        'https://api.github.com/users/github',
        'https://api.github.com/users/microsoft',
        'https://api.github.com/users/google'
    ];

     
    const fetchAllData = urls.map(async url => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${url}`);
        return response.json();
    });

    try {
        const results = await Promise.all(fetchAllData);

         
        results.forEach(({ login, ...otherDetails }) => {
            print(`Login: ${login}, Other Details:`, otherDetails);
        });

         
        const { v4: uuidv4 } = await import('https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js');
        print('Generated UUID:', uuidv4());

         
        const loginsSet = new Set(results.map(user => user.login));
        print('Unique logins:', [...loginsSet]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

     
    const user = {
        name: 'John Doe',
        age: 30
    };

    const handler = {
        set(target, property, value) {
            print(`Property ${property} set to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const proxiedUser = new Proxy(user, handler);
    proxiedUser.name = 'Jane Doe';  
})();
