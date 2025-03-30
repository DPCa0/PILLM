 

 
export class Utility {
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  }
}

 
const processUser = async ({ name, age, ...rest } = {}) => {
  print(`Processing ${name}, age ${age}. Additional info:`, rest);
  
  const data = await Utility.fetchJson('https://jsonplaceholder.typicode.com/users');
  print('Fetched users:', data);
};

 
const logMessages = (type, ...messages) => {
  messages.forEach(message => print(`[${type.toUpperCase()}]: ${message}`));
};

 
(async () => {
  try {
    await Utility.delay(1000);
    print('Started processing...');
    
    await processUser({ name: 'John Doe', age: 30, city: 'New York', job: 'Developer' });
    
    logMessages('info', 'Task completed', 'No errors found');
  } catch (error) {
    logMessages('error', 'Something went wrong', error.message);
  }
})();
