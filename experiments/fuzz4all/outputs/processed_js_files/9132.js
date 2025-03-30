class DataPipeline {
    constructor(...stages) {
        this.stages = stages;
    }
    
    process(data) {
        return this.stages.reduce((prevOutput, stage) => stage(prevOutput), data);
    }
}

const fetchUserData = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: 'John Doe', age: 30 }), 1000);
    });
};

const capitalizeName = ({ id, name, age }) => {
    return { id, name: name.toUpperCase(), age };
};

const filterByAge = (minAge) => ({ id, name, age }) => {
    if (age < minAge) throw new Error(`User under age: ${age}`);
    return { id, name, age };
};

const logSuccess = (data) => {
    print('Process succeeded:', data);
    return data;
};

const handleError = (fn) => async (data) => {
    try {
        return await fn(data);
    } catch (error) {
        console.error('Process failed:', error);
        return null;
    }
};

const processUser = new DataPipeline(
    handleError(fetchUserData),
    capitalizeName,
    filterByAge(18),
    logSuccess
);

(async () => {
    const userId = 42;
    await processUser.process(userId);
})();
