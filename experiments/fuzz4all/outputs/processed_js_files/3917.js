 
const randomTimeoutPromise = () => new Promise(resolve => {
    setTimeout(() => resolve(`Resolved after a random timeout!`), Math.random() * 2000);
});

 
(async () => {
    try {
         
        const promises = Array.from({ length: 5 }, randomTimeoutPromise);
        
         
        const results = await Promise.all(promises);
        
         
        const resultString = results.map((result, index) => `Result ${index + 1}: ${result}`)
                                    .reduce((acc, curr) => `${acc}\n${curr}`, 'Promise Results:');
        
        print(resultString);
        
         
        const user = { name: 'Alice', age: 30, city: 'Wonderland', profession: 'Developer' };
        const { name, ...rest } = user;
        const userClone = { name, ...rest };  
        
        print(`User Clone:`, userClone);
        
         
        const handler = {
            get(target, property) {
                print(`Accessing property '${property}': ${target[property]}`);
                return target[property];
            }
        };
        
        const proxiedUser = new Proxy(user, handler);
        print(`Proxied User Name: ${proxiedUser.name}`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
