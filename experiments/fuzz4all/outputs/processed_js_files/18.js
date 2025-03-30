 
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fetch = require('node-fetch');

 
(async () => {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

     
    const uniqueCompanies = [...new Set(users.map(user => user.company.name))];
    
     
    const highlight = (strings, ...values) => strings.reduce((result, str, i) =>
        `${result}${str}<strong>${values[i] || ''}</strong>`, '');
    
     
    const handler = {
        get(target, prop, receiver) {
            print(`Accessed property ${String(prop)}`);
            return Reflect.get(...arguments);
        }
    };

    const proxiedUsers = users.map(user => new Proxy(user, handler));

     
    proxiedUsers.forEach(user => {
        print(highlight`User: ${user.name ?? 'Unknown'} - Company: ${user?.company?.name ?? 'N/A'}`);
    });

     
    const delayedGreeting = new Promise((resolve) => setTimeout(resolve, 1000, 'Hello, world!'));
    try {
        const message = await delayedGreeting;
        print(message);
    } finally {
        print('Finished processing users');
    }
})();
