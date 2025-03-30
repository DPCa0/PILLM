 
const fetchUserData = async ({ id = 1, baseUrl = 'https://jsonplaceholder.typicode.com/users/' } = {}) => {
    try {
        const response = await fetch(`${baseUrl}${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    } catch (error) {
        console.error('Fetching error:', error);
    }
};

 
(async () => {
     
    const user = await fetchUserData() ?? {};
    print(`User Name: ${user?.name ?? 'Unknown'}`);
    
     
    const bold = (strings, ...values) => {
        return strings.reduce((result, str, i) => `${result}<b>${values[i - 1]}</b>${str}`);
    };
    print(bold`User Email: ${user?.email ?? 'Not provided'}`);

     
    function* fibonacci(limit) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < limit; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

     
    const firstFiveFibonacci = [...fibonacci(5)];
    print('First 5 Fibonacci numbers:', firstFiveFibonacci);

     
    const promises = [fetchUserData({ id: 2 }), fetchUserData({ id: 3 })];
    const results = await Promise.allSettled(promises);
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            print(`User ${index + 2} Name: ${result.value.name}`);
        } else {
            console.error(`Error fetching user ${index + 2}:`, result.reason);
        }
    });
})();
