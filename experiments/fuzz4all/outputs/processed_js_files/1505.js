 
const fetch = require('node-fetch');

 
(async () => {
    try {
         
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        
         
        const { name: { first, last }, email, location: { city, country } } = data.results[0];
        
         
        const user = {
            ...data.results[0],
            fullName: `${first} ${last}`,
            contactInfo: `${email}, ${city}, ${country}`
        };

         
        console.log(`User Information:
        Name: ${user.fullName}
        Email: ${user.contactInfo.split(', ')[0]}
        Location: ${user.contactInfo.split(', ').slice(1).join(', ')}`);

         
        const userSummary = summary`This is a user named ${user.fullName} living in ${city}, ${country}.`;
        print(userSummary);

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
})();

 
function summary(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

This program fetches random user data using asynchronous programming and employs various advanced JavaScript features such as destructuring, spread operator, tagged template literals, and async/await.