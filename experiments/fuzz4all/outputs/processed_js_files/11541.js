 
(async () => {
     
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json();

     
    const { login, public_repos } = data;
    
     
    print(`User: ${login}, Public Repos: ${public_repos}`);
    
     
    const repoNamesSet = new Set();
    const repoMap = new Map();

     
    const reposResponse = await fetch('https://api.github.com/users/octocat/repos');
    const reposData = await reposResponse.json();

    reposData.forEach(repo => {
         
        repoNamesSet.add(repo.name);
        repoMap.set(repo.name, repo.language ?? 'Unknown');
    });

     
    const repoNamesArray = [...repoNamesSet];
    const [firstRepo, ...otherRepos] = repoNamesArray;

     
    print('Repositories:');
    repoNamesArray.forEach(name => {
        print(`- ${name}: ${repoMap.get(name)}`);
    });

     
    await Promise.all(repoNamesArray.map(async (repoName) => {
        const branchesResponse = await fetch(`https: 
        const branchesData = await branchesResponse.json();
        print(`Repo: ${repoName}, Branches: ${branchesData.map(b => b.name).join(', ')}`);
    }));

     
    function* repoGenerator(repos) {
        for (let repo of repos) {
            yield repo;
        }
    }

    const repoGen = repoGenerator(repoNamesArray);
    print('Lazy Repo Access:');
    print(repoGen.next().value);  
    print(repoGen.next().value);  
})();
