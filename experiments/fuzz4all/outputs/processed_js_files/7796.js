 
(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

   
  const urls = [
    'https://api.github.com/users/octocat',
    'https://api.github.com/users/defunkt'
  ];

  const userDataPromises = urls.map(url => fetchData(url));

   
  const results = await Promise.allSettled(userDataPromises);

  for await (const { status, value, reason } of results) {
    if (status === 'fulfilled') {
      const { login, avatar_url } = value;  
      print(`User: ${login}, Avatar: ${avatar_url}`);
    } else {
      console.error(`Failed to fetch data: ${reason}`);
    }
  }

   
  const uniqueLogins = new Set(results.filter(r => r.status === 'fulfilled').map(r => r.value.login));

   
  const loginProxy = new Proxy(uniqueLogins, {
    get(target, property) {
      if (property === 'toString') {
        return () => [...target].join(', ');
      }
      return target[property];
    }
  });

  print(`Unique User Logins: ${loginProxy.toString()}`);

   
  class UserProfile {
    #login;
    #avatar;

    constructor(login, avatar) {
      this.#login = login;
      this.#avatar = avatar;
    }

    get profile() {
      return `Login: ${this.#login}, Avatar: ${this.#avatar}`;
    }
  }

  const profiles = results
    .filter(({ status }) => status === 'fulfilled')
    .map(({ value: { login, avatar_url } }) => new UserProfile(login, avatar_url));

  print('User Profiles:');
  profiles.forEach(profile => print(profile.profile));
})();
