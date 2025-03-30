 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve({
    user: 'Alice',
    roles: ['admin', 'user'],
    settings: {
        theme: 'dark',
        language: 'en'
    }
}), 1000));

 
const defaultSettings = {
    theme: 'light',
    language: 'en'
};

const settingsHandler = {
    get(target, prop) {
        return prop in target ? target[prop] : defaultSettings[prop];
    }
};

 
function logExecutionTime(target, name, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
        console.time(name);
        const result = await originalMethod.apply(this, args);
        console.timeEnd(name);
        return result;
    };
    return descriptor;
}

class UserProfile {
    constructor(data) {
        this.user = data.user;
        this.roles = new Set(data.roles);
        this.settings = new Proxy(data.settings, settingsHandler);
    }

    @logExecutionTime
    async displayProfile() {
        print(`User: ${this.user}`);
        print(`Roles: ${[...this.roles].join(', ')}`);
        print(`Theme: ${this.settings.theme}`);
        print(`Language: ${this.settings.language}`);
    }
}

 
(async () => {
    print('Fetching user data...');
    const userData = await fetchData();
    const userProfile = new UserProfile(userData);
    await userProfile.displayProfile();
})();
