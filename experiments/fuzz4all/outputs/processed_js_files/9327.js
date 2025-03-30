const users = [
    { name: 'Alice', age: 25, skills: ['JavaScript', 'React'] },
    { name: 'Bob', age: 30, skills: ['JavaScript', 'Node.js'] },
    { name: 'Charlie', age: 35, skills: ['JavaScript', 'Angular'] }
];

 
const fetchUserData = async (user) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...user, status: 'active' });
        }, 1000);
    });
};

 
const enhanceSkills = (user) => {
    return { ...user, skills: user.skills.map(skill => `${skill} (Advanced)`) };
};

 
async function* getUsersWithEnhancedSkills(users) {
    for (let user of users) {
        const userData = await fetchUserData(user);
        yield enhanceSkills(userData);
    }
}

 
(async () => {
    for await (let enhancedUser of getUsersWithEnhancedSkills(users)) {
        const { name, age, skills } = enhancedUser;
        print(`Name: ${name}, Age: ${age}, Skills: ${skills.join(', ')}`);
    }
})();

 
const monitorUsers = new Proxy(users, {
    set(target, property, value) {
        print(`Setting value ${JSON.stringify(value)} at index ${property}`);
        target[property] = value;
        return true;
    }
});

 
monitorUsers.push({ name: 'Dave', age: 40, skills: ['JavaScript', 'Vue.js'] });
