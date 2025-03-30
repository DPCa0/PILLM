 
async function getGitHubUser(username) {
    try {
        const response = await fetch(`https: 
        if (!response.ok) throw new Error('User not found');
        const { login, name, bio, public_repos: repos, followers } = await response.json();
        
        print(`User: ${login}`);
        print(`Name: ${name}`);
        print(`Bio: ${bio}`);
        print(`Public Repos: ${repos}`);
        print(`Followers: ${followers}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
const userHandler = {
    set(target, property, value) {
        if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new Error('Age must be a positive number');
        }
        target[property] = value;
        return true;
    }
};

 
const user = new Proxy({}, userHandler);

 
const baseUser = { name: 'Alice', age: 25 };
const extendedUser = { ...baseUser, location: 'Wonderland' };

function greetUser({ name, location, ...rest }) {
    print(`Hello, ${name} from ${location}`);
    print('Other info:', rest);
}

greetUser(extendedUser);

try {
    user.age = 30;  
    user.age = -5;  
} catch (error) {
    console.error(error.message);
}

 
const privateData = new WeakMap();
class PrivateExample {
    constructor(secret) {
        privateData.set(this, { secret });
    }

    revealSecret() {
        print('Secret:', privateData.get(this).secret);
    }
}

const example = new PrivateExample('shhh!');
example.revealSecret();

 
getGitHubUser('octocat');
