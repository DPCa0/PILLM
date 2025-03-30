 
class Library {
  #books = new Map();  

  static defaultLibrary() {
    return new Library('Default Library');
  }

  constructor(name) {
    this.name = name;
    this[Symbol.iterator] = function* () {
      yield* this.#books.entries();
    };
  }

  addBook(book) {
    const { title, author } = book;
    const id = Symbol(title);
    this.#books.set(id, { title, author, borrowDate: null });
  }

  borrowBook(title) {
    for (const [id, book] of this.#books) {
      if (book.title === title && book.borrowDate === null) {
        book.borrowDate = new Date();
        print(`You borrowed "${title}"`);
        return;
      }
    }
    print(`Sorry, "${title}" is not available`);
  }

  returnBook(title) {
    for (const [id, book] of this.#books) {
      if (book.title === title && book.borrowDate !== null) {
        book.borrowDate = null;
        print(`You returned "${title}"`);
        return;
      }
    }
    print(`"${title}" was not borrowed`);
  }

  availableBooks() {
    return [...this.#books.values()]
      .filter(book => book.borrowDate === null)
      .map(book => book.title);
  }
}

const myLibrary = Library.defaultLibrary();
myLibrary.addBook({ title: '1984', author: 'George Orwell' });
myLibrary.addBook({ title: 'Brave New World', author: 'Aldous Huxley' });

myLibrary.borrowBook('1984');
print('Available books:', myLibrary.availableBooks());
myLibrary.returnBook('1984');
print('Available books:', myLibrary.availableBooks());

for (const [id, book] of myLibrary) {
  print(`Title: ${book.title}, Author: ${book.author}`);
}
