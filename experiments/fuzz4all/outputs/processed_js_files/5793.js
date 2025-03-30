 

 
async function fetchUserData(username) {
    try {
         
        const response = await fetch(`https: 
        
         
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }
        
         
        const userData = await response.json();
        
         
        const { login, name, public_repos, followers } = userData;

        return { login, name, public_repos, followers };
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
}

 
(async () => {
    const username = 'octocat';  
    const data = await fetchUserData(username);
    
    if (data) {
        const { login, name, public_repos, followers } = data;
        print(`User: ${login}`);
        print(`Name: ${name}`);
        print(`Public Repos: ${public_repos}`);
        print(`Followers: ${followers}`);
    }
})();
