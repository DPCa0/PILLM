 

 
async function fetchUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'John Doe',
                age: 30,
                job: {
                    title: 'Developer',
                    skills: ['JavaScript', 'React', 'Node.js']
                }
            });
        }, 1000);
    });
}

 
async function interactWithUser() {
    try {
         
        const { name, age, job: { title, skills } } = await fetchUser();
        
         
        const userProxy = new Proxy({ name, age, title, skills }, {
            get(target, prop) {
                print(`Accessed property ${prop}: ${target[prop]}`);
                return target[prop];
            },
            set(target, prop, value) {
                print(`Set property ${prop} to ${value}`);
                target[prop] = value;
                return true;
            }
        });

         
        print(`Hello, ${userProxy.name}!`);
        userProxy.age += 1;
        print(`Happy Birthday! You are now ${userProxy.age}.`);
        
        print(`You are a ${userProxy.title} with skills in: ${userProxy.skills.join(', ')}.`);
        
         
        userProxy.skills.push('TypeScript');
        print(`Updated skills: ${userProxy.skills.join(', ')}.`);
        
    } catch (error) {
        console.error("Error interacting with user data:", error);
    }
}

 
interactWithUser();
