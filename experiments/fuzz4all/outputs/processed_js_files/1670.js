 
const crypto = require('crypto');
const axios = require('axios');

 
(async () => {
     
    const { data: { results: users } } = await axios.get('https://randomuser.me/api/?results=5');

     
    const userEmails = new Set();
    const hashedUserDetails = new Map();

     
    for (const { name: { first, last }, email, dob: { date } } of users) {
        userEmails.add(email);

         
        const userName = `${first} ${last}` ?? 'Unknown User';
        const birthYear = new Date(date).getFullYear() ?? 'Unknown Year';

         
        const userHash = crypto.createHash('sha256').update(email).digest('hex');

         
        hashedUserDetails.set(userHash, { userName, birthYear });
    }

     
    console.log({
        allEmails: [...userEmails],
        hashedUserDetails: [...hashedUserDetails]
    });
})();
