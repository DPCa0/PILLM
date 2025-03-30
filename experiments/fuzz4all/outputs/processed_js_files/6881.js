 
import fetch from 'node-fetch';

 
(async () => {
  try {
     
    const response = await fetch('https://randomuser.me/api/');
    const { results } = await response.json();
    const user = results[0];

     
    const { name: { first, last }, location: { city, country }, email } = user;

     
    const message = `
      Welcome ${first} ${last}!
      From: ${city}, ${country}
      Contact: ${email}
    `;

     
    function style(strings, ...values) {
      return strings.reduce((result, str, i) => {
        return `${result}${str}\x1b[33m${values[i] || ''}\x1b[0m`;
      }, '');
    }

    print(style`${message}`);

     
    const messageHandler = {
      get(target, property) {
        if (property === 'greet') {
          return () => print(`Hello, ${target.firstName} ${target.lastName}!`);
        }
        return target[property];
      }
    };

    const userMessage = new Proxy({ firstName: first, lastName: last, message }, messageHandler);
    userMessage.greet();  

     
    const uniqueKey = Symbol('uniqueId');
    userMessage[uniqueKey] = Math.random();

    print(`User's unique key: ${userMessage[uniqueKey]}`);

    // Using a Set to manage a unique collection
    const uniqueAttributes = new Set([city, country, email]);
    uniqueAttributes.add(email); // Attempt to add duplicate
    print('Unique User Attributes:', uniqueAttributes);

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();
