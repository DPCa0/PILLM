const fetch = require('node-fetch');

(async () => {
  try {
     
    const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
    const commits = await response.json();

     
    const recentCommits = commits.slice(0, 5).map(({ commit: { author, message }, sha }) => ({
      author: author.name,
      message,
      sha
    }));

     
    const commitMap = new Map(recentCommits.map(commit => [commit.sha, commit]));

     
    const authors = new Set(recentCommits.map(commit => commit.author));

    print('Unique Authors:', [...authors]);
    print('Recent Commits:', commitMap);

     
    function* commitGenerator(commitMap) {
      for (let commit of commitMap.values()) {
        yield commit;
      }
    }

     
    const gen = commitGenerator(commitMap);
    let next = gen.next();
    while (!next.done) {
      print('Generated Commit:', next.value);
      next = gen.next();
    }

  } catch (error) {
    console.error('Error fetching commits:', error);
  }
})();
