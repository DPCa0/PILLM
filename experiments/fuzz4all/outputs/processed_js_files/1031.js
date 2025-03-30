 
function evaluateExpression(literals, ...expressions) {
    return literals.reduce((acc, literal, i) => {
         
        const expressionValue = expressions[i] !== undefined ? eval(expressions[i]) : '';
        return `${acc}${literal}${expressionValue}`;
    }, '');
}

 
async function fetchUserData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data.map(user => ({
            ...user,
             
            [`user_${user.id}`]: `${user.name} - ${user.email}`
        }));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
async function processData(url) {
    let users = await fetchUserData(url);
    return users
        .filter(({ user_1 }) => user_1.includes('@'))
        .map(({ id, name, ...rest }) => ({
            id,
            fullName: name.toUpperCase(),
            ...rest
        }))
        .reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});
}

 
(async () => {
    const userDataUrl = 'https://jsonplaceholder.typicode.com/users';
    const processedData = await processData(userDataUrl);
    print(evaluateExpression`Processed User Data: ${JSON.stringify(processedData, null, 2)}`);
})();
