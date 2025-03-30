 
const getUserData = async (userId) => {
    const fakeApiCall = id => new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: "User" + id, roles: ["admin", "user"] }), 1000);
    });

    try {
        const user = await fakeApiCall(userId);
        const { name, roles } = user;
        return { name, roles };
    } catch (error) {
        throw new Error("Failed to fetch user data.");
    }
};

const createUserSymbol = (() => {
    const userMap = new Map();
    return (name) => {
        const sym = Symbol(name);
        userMap.set(sym, { name, data: null });
        return {
            getSymbol: () => sym,
            getData: async (userId) => {
                if (!userMap.get(sym).data) {
                    const userData = await getUserData(userId);
                    userMap.get(sym).data = userData;
                }
                return userMap.get(sym).data;
            },
        };
    };
})();

(async () => {
    const user1 = createUserSymbol('User1');
    const user2 = createUserSymbol('User2');

    print(await user1.getData(1));  
    print(await user2.getData(2));  
})();
