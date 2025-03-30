 
import fetch from 'node-fetch';

 
(async function complexFeaturesDemo() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

     
    const wordCount = data
      .map(post => post.body.split(' ').length)
      .reduce((acc, count) => acc + count, 0);

     
    const uniqueUserIds = [...new Set(data.map(post => post.userId))];

     
    const userValidationHandler = {
      set(target, property, value) {
        if (property === 'email' && !value.includes('@')) {
          throw new Error('Invalid email address');
        }
        target[property] = value;
        return true;
      }
    };

    const user = new Proxy({}, userValidationHandler);
    user.email = 'user@example.com';  
     

     
    function highlight(strings, ...values) {
      return strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');
    }
    const userCount = uniqueUserIds.length;
    print(highlight`Total number of words: ${wordCount}, Unique users: ${userCount}`);

  } catch (error) {
    console.error('Error:', error.message);
  }
})();
