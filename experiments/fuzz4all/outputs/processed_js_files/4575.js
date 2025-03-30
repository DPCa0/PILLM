 
const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    posts: [
        { id: 1, title: 'Advanced JavaScript', content: 'Exploring advanced features in JS.' },
        { id: 2, title: 'ES6 Features', content: 'Understanding the new features introduced in ES6.' }
    ],
    displayInfo() {
        print(`User: ${this.name}, Email: ${this.email}`);
    }
};

 
const userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
});

 
for (const { title, content } of userProxy.posts) {
    print(`Post Title: ${title}, Content: ${content}`);
}

 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const language = 'JavaScript';
print(highlight`Exploring advanced features in ${language}.`);

 
const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(userProxy), 1000);
    });
};

(async () => {
    const userInfo = await getUserInfo();
    userInfo.displayInfo();
    userInfo.name = 'John Smith';
    userInfo.displayInfo();
})();
