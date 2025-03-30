 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

 
const userInterests = new Map([
    ['Alice', new Set(['Reading', 'Gardening', 'Coding'])],
    ['Bob', new Set(['Gaming', 'Cycling', 'Coding'])],
    ['Charlie', new Set(['Cooking', 'Coding', 'Swimming'])]
]);

 
async function showInterests() {
     
    for (const [user, interests] of userInterests) {
        await randomDelay();  
        print(`Interests of ${user}:`);

         
        const interestArray = [...interests].map(interest => `- ${interest}`);
        interestArray.forEach(interest => print(interest));
    }
}

 
function createLoggingProxy(target) {
    return new Proxy(target, {
        get(obj, prop) {
            print(`Accessing property: ${prop}`);
            return prop in obj ? obj[prop] : 'Property does not exist';
        }
    });
}

 
const userProfile = {
    name: 'Alice',
    details: {
        age: 30,
        hobby: 'Gardening'
    }
};
const proxiedProfile = createLoggingProxy(userProfile);
print(proxiedProfile.name);           
print(proxiedProfile.details.age);    
print(proxiedProfile.unknownProp);    

 
showInterests();
