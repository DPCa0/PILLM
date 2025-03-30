 
(async () => {
  try {
     
    const { randomUUID } = await import('crypto');

     
    const target = {
      message: "Hello",
      recipient: "world"
    };

    const handler = {
      get: (obj, prop) => {
        if (prop in obj) {
          return obj[prop];
        } else {
          throw `Property ${prop} does not exist.`;
        }
      },
      set: (obj, prop, value) => {
        print(`Setting value ${value} to property ${prop}`);
        obj[prop] = value;
        return true;
      }
    };

    const reactiveObject = new Proxy(target, handler);

     
    const customTag = (strings, ...values) => {
      return strings.reduce((acc, str, i) => {
        const value = values[i] ? `[*${values[i]}*]` : '';
        return `${acc}${str}${value}`;
      }, '');
    };

     
    const fetchUserData = async (userId) => {
      const mockData = {
        id: userId,
        name: `User-${userId}`,
        uuid: randomUUID()
      };
       
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return mockData;
    };

     
    const userId = 42;
    const userData = await fetchUserData(userId);

     
    reactiveObject.message = customTag`Hello, ${userData.name}! Your UUID is ${userData.uuid}.`;

     
    print(reactiveObject.message ?? "Default message");
    print(reactiveObject.nonExistentProp ?? "This property does not exist");

  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
})();
