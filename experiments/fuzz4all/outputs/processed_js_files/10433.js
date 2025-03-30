const users = [
    { name: 'Alice', age: 25, role: 'admin' },
    { name: 'Bob', age: 30, role: 'user' },
    { name: 'Charlie', age: 35, role: 'guest' }
];

const fetchUserData = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.name === username);
            if (user) {
                resolve(user);
            } else {
                reject(new Error('User not found'));
            }
        }, 1000);
    });
};

const updateUserRole = async (username, newRole) => {
    try {
        let user = await fetchUserData(username);
        print(`Current Role of ${username}: ${user.role}`);
        user = { ...user, role: newRole };
        print(`Updated Role of ${username}: ${user.role}`);
    } catch (error) {
        console.error(error.message);
    }
};

const printRoles = (roleSet) => {
    roleSet.forEach(role => print(`Role: ${role}`));
};

const handleUserRoles = async () => {
    const roles = new Set(users.map(user => user.role));
    printRoles(roles);
    await updateUserRole('Bob', 'moderator');
    roles.add('moderator');
    printRoles(roles);
};

handleUserRoles();
