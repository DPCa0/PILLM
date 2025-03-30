 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing property "${property}": ${target[property]}`);
            return target[property];
        } else {
            print(`Property "${property}" doesn't exist`);
        }
    }
};

const asyncOperation = (value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (value) {
            resolve(`Resolved with value: ${value}`);
        } else {
            reject('Rejected due to falsy value');
        }
    }, 1000);
});

async function* processValues(values) {
    for (let value of values) {
        try {
            const result = await asyncOperation(value);
            yield result;
        } catch (error) {
            yield error;
        }
    }
}

const person = {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 28,
    location: 'Earth'
};

const proxyPerson = new Proxy(person, handler);

const fullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
print(`Full Name: ${fullName(proxyPerson)}`);  // Destructuring in function parameters

(async () => {
    const values = [true, false, true, '', 42];
    const gen = processValues(values);

    for await (const message of gen) {
        print(message);
    }
})();
