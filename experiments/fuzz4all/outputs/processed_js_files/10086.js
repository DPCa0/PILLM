 
import { readFile } from 'fs/promises';

 
(async () => {
  try {
     
    const response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
    const commits = await response.json();

     
    const [latestCommit, { commit: secondCommit = {} }] = commits;
    const { message: latestMessage } = latestCommit.commit;
    const { message: secondMessage = 'No message available' } = secondCommit;

     
    const logCommitMessages = (strings, ...values) => 
      strings.reduce((acc, str, index) => acc + str + (values[index] || ''), '');

    print(logCommitMessages`Latest Commit Message: ${latestMessage}\nSecond Commit Message: ${secondMessage}`);

     
    function* messageGenerator(messages) {
      for (const message of messages) {
        yield message.toUpperCase();
      }
    }

    const messages = messageGenerator([latestMessage, secondMessage]);
    for (const message of messages) {
      print(`Processed: ${message}`);
    }

     
    const data = await readFile('./sample.txt', 'utf8');
    print('File Content:', data);

     
    const user = { preferences: { theme: null } };
    const userTheme = user.preferences?.theme ?? 'default-theme';
    print('User Theme:', userTheme);

  } catch (error) {
    console.error('Error:', error);
  }
})();
