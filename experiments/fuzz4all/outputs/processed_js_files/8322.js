 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncNumbers() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);
    yield i;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'secret') {
      return "You found the secret!";
    }
    return target[prop] ?? 'Property does not exist';
  }
};

const obj = new Proxy({}, handler);

 
(async () => {
  for await (const num of asyncNumbers()) {
    print(`Async number: ${num}`);
  }
  
  print(obj.existingProp);  
  print(obj.secret);  
})();

 
function htmlEscape(strings, ...values) {
  const escape = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return strings.reduce((result, string, i) => result + escape(string) + (values[i] !== undefined ? escape(String(values[i])) : ''), '');
}

const userInput = '<script>alert("XSS!")</script>';
print(htmlEscape`User input: ${userInput}`);

 
const defaultSettings = { theme: 'dark', lang: 'en' };
const userSettings = { lang: 'es' };
const settings = { ...defaultSettings, ...userSettings };

const { theme = 'light', lang = 'en' } = settings;
print(`Theme: ${theme}, Language: ${lang}`);
