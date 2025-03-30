 
(async () => {
  if (!globalThis.fetch) {
    await import('node-fetch').then(({ default: fetch }) => {
      globalThis.fetch = fetch;
    });
  }

   
  async function getGitHubUserRepos(username) {
    try {
      const response = await fetch(`https: 
      if (!response.ok) throw new Error('Failed to fetch data');

      const repos = await response.json();
      return repos.map(({ name, html_url }) => ({ name, url: html_url }));
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

   
  const loggerProxy = (target) => new Proxy(target, {
    get(obj, prop) {
      print(`Getting property ${String(prop)}`);
      return prop in obj ? obj[prop] : 'Property does not exist';
    },
    set(obj, prop, value) {
      print(`Setting property ${String(prop)} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });

  const user = loggerProxy({ name: 'John Doe', age: 30 });

  print(user.name);  
  user.age = 31;

   
  function bold(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] ? `<b>${values[i]}</b>` : ''), '');
  }

  const username = 'octocat';
  print(bold`Fetching repositories for user: ${username}`);

   
  const results = new Map();

  const fetchAndCacheUserRepos = async (username) => {
    if (results.has(username)) return results.get(username);
    
    const data = await getGitHubUserRepos(username);
    results.set(username, data);
    return data;
  };

  fetchAndCacheUserRepos(username)
    .then(data => {
      print(bold`Repositories for user <b>${username}</b>:`);
      console.table(data);
    })
    .catch(err => console.error('Failed:', err));
})();
