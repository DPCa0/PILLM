 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'John Doe',
          age: 30,
          location: 'Earth',
          preferences: {
            theme: 'dark',
            language: 'JavaScript'
          }
        }
      });
    }, 1000);
  });
};

 
const getUserData = async () => {
  const data = await fetchData();
  const {
    user: {
      name,
      preferences: { theme, language }
    }
  } = data;
  print(`User: ${name}, Prefers: ${theme} theme, Language: ${language}`);
};

 
const logHandler = {
  get: function(target, property, receiver) {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: function(target, property, value, receiver) {
    print(`Set property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
const settings = new Proxy(
  {
    volume: 75,
    brightness: 50
  },
  logHandler
);

 
settings.volume = 85;
print(`Volume is: ${settings.volume}`);

 
getUserData();
