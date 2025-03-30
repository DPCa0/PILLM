 

 
async function fetchData(url) {
   
  const fetchProxy = new Proxy(fetch, {
    apply: async (target, thisArg, argumentsList) => {
      print(`Fetching data from: ${argumentsList[0]}`);
      const response = await target.apply(thisArg, argumentsList);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return response.json();
    }
  });
  
   
  return fetchProxy(url);
}

 
(async () => {
  const url = 'https://api.github.com/users/octocat';
  
  try {
     
    const data = await fetchData(url);
    
     
    const { login, id, url: userUrl, public_repos: repos } = data;
    
     
    const userInfo = {
      login,
      id,
      userUrl,
      repos
    };
    
     
    const uniqueRepos = new Set([repos, repos + 1, repos + 2]);
    
    print(`User Info:\n${JSON.stringify(userInfo, null, 2)}`);
    print(`Unique Repos: ${[...uniqueRepos]}`);
    
     
    const repoMap = new Map(Array.from(uniqueRepos, (repo, index) => [`repo_${index}`, repo]));
    
    print('Repo Map:', repoMap);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
