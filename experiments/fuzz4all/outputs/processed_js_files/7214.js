 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { user: "Alice", age: 30 };
            Math.random() > 0.1 ? resolve(data) : reject('Fetch error');
        }, 1000);
    });
};

 
const createValidatedUser = (user) => {
    return new Proxy(user, {
        get(target, prop) {
            if (prop in target) {
                print(`Property "${prop}" accessed`);
                return target[prop];
            } else {
                console.error(`Property "${prop}" does not exist`);
                return undefined;
            }
        },
        set(target, prop, value) {
            if (prop === 'age' && typeof value !== 'number') {
                console.error(`Invalid type for "${prop}", expected number`);
                return false;
            }
            target[prop] = value;
            print(`Property "${prop}" set to "${value}"`);
            return true;
        }
    });
};

 
const main = async () => {
    try {
        const data = await fetchData();
        const validatedUser = createValidatedUser(data);
        
        print(validatedUser.user);    
        validatedUser.age = 35;            
        validatedUser.age = "thirty";      
        print(validatedUser.height);  

         
        const { calculateAgeInMonths } = await import('./helper.js');
        print(`Age in months: ${calculateAgeInMonths(validatedUser.age)}`);

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

main();

**helper.js**
export const calculateAgeInMonths = (age) => age * 12;
