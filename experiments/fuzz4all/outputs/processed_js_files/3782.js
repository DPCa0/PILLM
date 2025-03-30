class ComplexSystem {
    constructor() {
        this.data = new Map();
    }

    async fetchData() {
         
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        users.forEach(user => this.data.set(user.id, user));
    }

    *dataIterator() {
        for (let [id, user] of this.data.entries()) {
            yield { id, name: user.name, email: user.email };
        }
    }

    analyzeData() {
        return [...this.dataIterator()].reduce((summary, user) => {
            summary.total++;
            summary.names.push(user.name);
            return summary;
        }, { total: 0, names: [] });
    }
}

(async () => {
    const system = new ComplexSystem();
    await system.fetchData();
    
    const analysis = system.analyzeData();
    print(`Total Users: ${analysis.total}`);
    print('User Names:', analysis.names.join(', '));
})();
