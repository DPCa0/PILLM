class Api {
    #dataCache = new Map();

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async fetchData(id) {
        if (this.#dataCache.has(id)) {
            return this.#dataCache.get(id);
        }

        const response = await fetch(`${this.endpoint}/${id}`);
        const data = await response.json();
        this.#dataCache.set(id, data);
        return data;
    }
}

const processData = (data) => {
    const { name, age, hobbies } = data;
    return {
        description: `${name} is ${age} years old and enjoys ${hobbies.join(', ')}.`,
        nameLength: name.length,
        ageSquared: age ** 2,
    };
};

(async () => {
    const api = new Api('https://api.example.com/user');
    const userIds = [1, 2, 3, 4, 5];

    try {
        const userDataPromises = userIds.map(id => api.fetchData(id));
        const usersData = await Promise.all(userDataPromises);

        const processedData = usersData.map(processData);
        print(processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
