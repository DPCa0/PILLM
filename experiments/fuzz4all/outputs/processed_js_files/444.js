const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = (data) => {
    const { name, age, skills } = data;
    return {
        uppercasedName: name.toUpperCase(),
        isAdult: age >= 18,
        skillCount: skills.length,
    };
};

class User {
    constructor(name, age, skills) {
        this.name = name;
        this.age = age;
        this.skills = skills;
    }

    static async fromAPI(url) {
        const data = await fetchData(url);
        const processed = processData(data);
        return new User(processed.uppercasedName, data.age, data.skills);
    }

    getSkills() {
        return this.skills.join(', ');
    }

    toString() {
        return `Name: ${this.name}, Age: ${this.age}, Skills: ${this.getSkills()}`;
    }
}

(async () => {
    try {
        const user = await User.fromAPI('https://api.example.com/user/1');
        print(user.toString());
    } catch (error) {
        console.error('Error fetching user:', error);
    }
})();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    print('Start async processing');
    await delay(2000);
    print('Finished after 2 seconds');
})();
