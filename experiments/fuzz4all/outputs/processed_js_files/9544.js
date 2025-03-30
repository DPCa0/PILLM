 
function sql(strings, ...values) {
  return strings.reduce((result, string, i) => 
    `${result}${string}${values[i] ? `'${values[i]}'` : ''}`, '');
}

 
const secureDatabase = new Proxy({}, {
  get: (target, prop) => {
    if (prop in target) {
      print(`Retrieving '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`No such property '${prop}'`);
      return null;
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'string') {
      print(`Setting '${prop}' to '${value}'`);
      target[prop] = value;
      return true;
    } else {
      console.error(`Value for '${prop}' must be a string`);
      return false;
    }
  }
});

 
async function performDatabaseOperation() {
  await new Promise(resolve => setTimeout(resolve, 1000));  
  secureDatabase.user = "admin";
  print(sql`SELECT * FROM users WHERE username = ${secureDatabase.user}`);
}

 
const userSettings = { theme: 'dark', notifications: true, language: 'en' };
const { theme, ...otherSettings } = userSettings;
print(`Theme: ${theme}, Other Settings:`, otherSettings);

 
(() => {
  print('Starting the database operation...');
  performDatabaseOperation();
})();
