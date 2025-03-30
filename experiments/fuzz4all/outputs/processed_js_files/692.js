 
async function getQuote() {
  const cache = new Map();
  const url = 'https://api.quotable.io/random';

  if (cache.has(url)) {
    return cache.get(url);
  }

  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, data.content);
  return data.content;
}

 
function logExecution(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${name} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class App {
  constructor() {
    this.init();
  }

   
  *themeGenerator() {
    const themes = ['light', 'dark', 'solarized'];
    let index = 0;
    while (true) {
      yield themes[index % themes.length];
      index++;
    }
  }

  @logExecution
  async init() {
    print('App initializing...');

     
    const handler = {
      set: function (obj, prop, value) {
        print(`Theme changed to: ${value}`);
        obj[prop] = value;
        return true;
      }
    };
    
    const themeGenerator = this.themeGenerator();
    this.theme = new Proxy({ current: themeGenerator.next().value }, handler);

     
    const quote = await getQuote();
    print(`Random Quote: ${quote ?? 'No quote available'}`);
    
    setInterval(() => {
      this.theme.current = themeGenerator.next().value;
    }, 5000);
  }
}

new App();
