 
function formatMessage(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`, '');
}

 
const user = {
    name: 'Alice',
    age: 25,
    role: 'developer'
};

const userProxy = new Proxy(user, {
    get(target, prop) {
        if (prop === 'info') {
            return `Name: ${target.name}, Age: ${target.age}, Role: ${target.role}`;
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
});

 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
(async () => {
    const urls = ['https://api.github.com/users/octocat', 'https://api.github.com/users/defunkt'];
    for await (const data of fetchData(urls)) {
        print('Fetched Data:', data);
    }

     
    const greeting = formatMessage`Hello, ${userProxy.name}! Your role is ${userProxy.role}.`;
    document.body.innerHTML = greeting;

     
    print('User Info:', userProxy.info);

     
    userProxy.age = 26;
    print('Updated Age:', userProxy.age);
})();
