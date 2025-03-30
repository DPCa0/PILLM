 

const fetchData = async () => {
    const simulateNetworkRequest = () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve({ userId: 1, userName: 'JaneDoe', email: 'jane.doe@example.com' }), 1000);
        });
    };

    try {
        const { userId, userName, email } = await simulateNetworkRequest();
        
         
        const bold = (strings, ...values) => {
            return strings.reduce((result, str, i) => {
                return `${result}${str}<strong>${values[i] || ''}</strong>`;
            }, '');
        };

        const message = bold`User Data: ID - ${userId}, Name - ${userName}, Email - ${email}`;
        document.body.innerHTML = message;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();

 
const processData = ({ results }) => {
     
    const uniqueUsers = [...new Set(results.map(({ email }) => email))];
    return uniqueUsers.map(email => {
        const user = results.find(user => user.email === email);
        return { ...user, active: true };
    });
};

 
const apiResponse = {
    results: [
        { email: 'jane.doe@example.com', userName: 'JaneDoe' },
        { email: 'john.smith@example.com', userName: 'JohnSmith' },
        { email: 'jane.doe@example.com', userName: 'JaneDoe' }  
    ]
};

print(processData(apiResponse));
