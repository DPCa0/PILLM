 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { 
            user: { name: 'John Doe', age: 30 },
            skills: ['JavaScript', 'React', 'Node.js']
        };
        Math.random() > 0.5 ? resolve(data) : reject('Fetch Error: Unable to retrieve data');
    }, 1000);
});

 
async function processData() {
    try {
        const { user, skills } = await fetchData();  
        const [firstSkill, ...restSkills] = skills;  

        print(`User: ${user.name}, Age: ${user.age}`);
        print(`Primary Skill: ${firstSkill}`);
        print(`Other Skills: ${restSkills.join(', ')}`);

         
        const userProxy = new Proxy(user, {
            get(target, property) {
                print(`Accessing property '${property}' with value: ${target[property]}`);
                return target[property];
            },
            set(target, property, value) {
                print(`Setting property '${property}' with value: ${value}`);
                target[property] = value;
                return true;
            }
        });

         
        print(`User via Proxy: ${userProxy.name}, Age via Proxy: ${userProxy.age}`);

         
        userProxy.age = 31;
        print(`Updated Age via Proxy: ${userProxy.age}`);

    } catch (error) {
        console.error(error);
    }
}

processData();
