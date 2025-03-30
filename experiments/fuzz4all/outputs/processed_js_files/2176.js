 

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();

function delayedValue(val, delay) {
    return new Promise(resolve => setTimeout(() => resolve(val), delay));
}

async function fetchData() {
    try {
        const data = [
            { id: gen.next().value, name: await delayedValue('Alice', 1000) },
            { id: gen.next().value, name: await delayedValue('Bob', 500) },
            { id: gen.next().value, name: await delayedValue('Charlie', 300) }
        ];

         
        const [firstUser, ...otherUsers] = data;
        print(`First user: ${firstUser.name}`);

        print('Other users:');
        otherUsers.forEach(({ id, name }) => {
            print(`Id: ${id}, Name: ${name}`);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

 
const user = {
    firstName: 'John',
    lastName: 'Doe'
};

const handler = {
    get(target, property) {
        if (property === 'fullName') {
            return `${target.firstName} ${target.lastName}`;
        }
        return target[property];
    }
};

const proxiedUser = new Proxy(user, handler);
print('User Full Name:', proxiedUser.fullName);
