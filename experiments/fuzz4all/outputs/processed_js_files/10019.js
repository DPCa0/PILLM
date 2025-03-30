 
const uniqueID = Symbol('id');
const userData = {
    [uniqueID]: 101,
    name: 'Alice',
    age: 30,
    skills: ['JavaScript', 'React', 'Node.js']
};

 
const userProxy = new Proxy(userData, {
    get(target, prop) {
        if (prop === 'skills') {
            return target[prop].map(skill => skill.toUpperCase());
        }
        return target[prop];
    },
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
});

 
async function* asyncSkillIterator(skills) {
    for (const skill of skills) {
        await new Promise(resolve => setTimeout(resolve, 500));
        yield `Skill: ${skill}`;
    }
}

 
(async () => {
    print(`User Name: ${userProxy.name}`);
    print(`User ID: ${userProxy[uniqueID]}`);

     
    print(`Skills: ${userProxy.skills.join(', ')}`);
    userProxy.age = 31;

    try {
        userProxy.age = 'Thirty';
    } catch (e) {
        console.error(`Error: ${e.message}`);
    }

    print('Iterating over skills asynchronously:');
    for await (const skill of asyncSkillIterator(userProxy.skills)) {
        print(skill);
    }
})();
