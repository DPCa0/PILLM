Certainly! Here's a JavaScript program using advanced features like async/await, Promises, destructuring, and the Fetch API:

async function fetchUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const userData = await response.json();
        const { login, name, public_repos: repos, followers } = userData;

        print(`User: ${login}`);
        print(`Name: ${name}`);
        print(`Public Repositories: ${repos}`);
        print(`Followers: ${followers}`);

    } catch (error) {
        console.error('Fetching user data failed:', error);
    }
}

function getGitHubUser() {
    const username = 'octocat';
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(username);
        }, 1000);
    });
}

(async function() {
    try {
        const username = await getGitHubUser();
        await fetchUserData(username);
    } catch (error) {
        console.error('Error in processing:', error);
    }
})();

This program asynchronously fetches a GitHub user's data using a simulated delay with a promise, demonstrating various advanced JavaScript features.