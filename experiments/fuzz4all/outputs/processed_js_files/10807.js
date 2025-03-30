 

const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId) {
                resolve({ id: userId, name: 'John Doe', email: 'john@example.com' });
            } else {
                reject('Invalid user ID');
            }
        }, 1000);
    });
};

const processUserData = async (userId) => {
    try {
        const { id, ...userData } = await fetchUserData(userId);
        print(`Fetched data for user ${id}:`, userData);

        const userWithFullName = { ...userData, fullName: `${userData.name} [ID: ${id}]` };
        print('Processed User Data:', userWithFullName);
    } catch (error) {
        console.error('Error:', error);
    }
};

processUserData(123);

 

const user = {
    name: 'Alice',
    age: 25
};

const userProxy = new Proxy(user, {
    set: (target, property, value) => {
        print(`Property ${property} changed from ${target[property]} to ${value}`);
        target[property] = value;
        return true;
    }
});

userProxy.name = 'Bob';
userProxy.age = 30;

 

function* generateSequence() {
    let count = 0;
    while (count < 3) {
        yield count++;
    }
}

const sequence = generateSequence();
print(sequence.next().value);
print(sequence.next().value);
print(sequence.next().value);
