 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
class QuoteGenerator {
  constructor(author, quotes) {
    this.author = author;
    this.quotes = quotes;
  }
  
   
  getRandomQuote() {
    const index = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[index];
  }
  
   
  async displayQuote() {
    print(`Fetching a quote from ${this.author}...`);
    await delay(1000);  
    
    const quote = this.getRandomQuote();
    print(`"${quote}" - ${this.author}`);
  }
}

 
(async () => {
  const authors = [
    new QuoteGenerator('Albert Einstein', [
      'Life is like riding a bicycle. To keep your balance you must keep moving.',
      'Imagination is more important than knowledge.',
      'Strive not to be a success, but rather to be of value.'
    ]),
    new QuoteGenerator('Isaac Newton', [
      'If I have seen further it is by standing on the shoulders of Giants.',
      'I can calculate the motion of heavenly bodies, but not the madness of people.',
      'What we know is a drop, what we don’t know is an ocean.'
    ])
  ];
  
   
  for (const { displayQuote } of authors) {
    await displayQuote();
    await delay(500);  
  }
})();
