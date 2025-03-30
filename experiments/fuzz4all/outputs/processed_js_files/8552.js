class Person {
  #name;  

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  async *talk() {
    const responses = ['Hi!', 'How are you?', 'I love JavaScript!', 'Goodbye!'];
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield `${this.#name} says: ${response}`;
    }
  }
}

function decorate(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${key} with`, args);
    return originalMethod.apply(this, args);
  };
}

class ChatBot extends Person {
  constructor(name, language) {
    super(name);
    this.language = language;
  }

  @decorate
  speak() {
    print(`Hello! I am ${this.name} and I speak ${this.language}.`);
  }

  static createBots(names) {
    return names.map(name => new ChatBot(name, 'English'));
  }
}

(async () => {
  const bots = ChatBot.createBots(['Alice', 'Bob']);
  bots.forEach(bot => bot.speak());

  for (const bot of bots) {
    print(`\nConversation with ${bot.name}:`);
    for await (const line of bot.talk()) {
      print(line);
    }
  }
})();
