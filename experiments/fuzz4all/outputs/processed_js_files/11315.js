 

 
(async () => {
  const { default: fetch } = await import('node-fetch');

   
  const getGitHubUser = async (username) => {
    try {
      const response = await fetch(`https: 
      if (!response.ok) throw new Error('User not found');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

   
  const displayGitHubUser = async (username) => {
    const { login, name, public_repos } = await getGitHubUser(username);
    print(`User: ${login}\nName: ${name}\nPublic Repos: ${public_repos}`);
  };

   
  displayGitHubUser('octocat');
})();
