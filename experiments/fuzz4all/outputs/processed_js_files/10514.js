 

 
const targetObject = {
    firstName: 'John',
    lastName: 'Doe'
};

const handler = {
    get: (target, prop) => {
        if (prop === 'fullName') {
            return `${target.firstName} ${target.lastName}`;
        }
        return target[prop];
    },
    set: (target, prop, value) => {
        if (prop === 'fullName') {
            const [firstName, lastName] = value.split(' ');
            target.firstName = firstName;
            target.lastName = lastName;
            return true;
        }
        target[prop] = value;
        return true;
    }
};

const person = new Proxy(targetObject, handler);

 
function* range(start, end, step = 1) {
    let current = start;
    while (current <= end) {
        yield current;
        current += step;
    }
}

 
async function processRange() {
    const results = [];

    for (const num of range(1, 5)) {
        results.push(await delayedSquared(num));
    }

    return results;
}

 
function delayedSquared(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number * number);
        }, 1000);
    });
}

 
person.fullName = 'Jane Smith';
print(`Person's full name: ${person.fullName}`); // Jane Smith

// Executing the async range processing
processRange().then(results => {
    print('Squared results:', results);
}).catch(err => console.error(err));
