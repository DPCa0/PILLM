 
const library = {
  name: 'City Library',
  books: new Map([
    ['1984', { author: 'George Orwell', copies: 4 }],
    ['Brave New World', { author: 'Aldous Huxley', copies: 6 }],
  ]),
  patrons: new Set(['Alice', 'Bob', 'Charlie']),
   
  *availableBooks() {
    for (let [title, info] of this.books) {
      if (info.copies > 0) yield title;
    }
  },
   
  addBook(title, author, copies) {
    this.books.set(title, { author, copies });
  },
  addPatron(name) {
    this.patrons.add(name);
  },
};

 
const libraryProxy = new Proxy(library, {
  set(target, property, value) {
    if (property === 'name' && typeof value !== 'string') {
      throw new Error('Name must be a string');
    }
    target[property] = value;
    return true;
  },
  get(target, property) {
    if (property === 'bookCount') {
      return target.books.size;
    }
    return target[property];
  },
});

 
async function simulateNetworkFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Fahrenheit 451', 'To Kill a Mockingbird']);
    }, 2000);
  });
}

 
(async () => {
  print(`Welcome to the ${libraryProxy.name}`);
  print(`Currently, we have ${libraryProxy.bookCount} books.`);

   
  const newBooks = await simulateNetworkFetch();
  for (let book of newBooks) {
    libraryProxy.addBook(book, 'Unknown', 5);
  }

  print('Updated book list:');
  for (let book of libraryProxy.availableBooks()) {
    print(book);
  }

  print('Library Patrons:');
  libraryProxy.patrons.forEach((patron) => print(patron));
})();
