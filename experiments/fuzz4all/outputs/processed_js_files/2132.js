 
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  async sendNotification(notificationService) {
    await notificationService.send(this.email, `Hello, ${this.name}!`);
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNotificationService = {
  async send(email, message) {
    await delay(1000);  
    print(`Notification sent to ${email}: ${message}`);
  }
};

const main = async () => {
  const user1 = new User('Alice', 'alice@example.com');
  const user2 = new User('Bob', 'bob@example.com');
  
   
  await Promise.all([
    user1.sendNotification(simulateNotificationService),
    user2.sendNotification(simulateNotificationService)
  ]);

   
  async function* userGenerator(users) {
    for (const user of users) {
      await delay(500);  
      yield user;
    }
  }

  for await (const user of userGenerator([user1, user2])) {
    print(`Processed: ${user.name}`);
  }
};

 
(async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error:', error);
  }
})();
