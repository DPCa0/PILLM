 
const library = {
    name: "City Library",
    books: [
        { id: 1, title: "1984", author: "George Orwell", available: true },
        { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: false },
        { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: true }
    ],
    staff: [
        { id: 1, name: "Alice", position: "Librarian" },
        { id: 2, name: "Bob", position: "Assistant" }
    ],
    findBook: function(bookId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const book = this.books.find(b => b.id === bookId);
                if (book) {
                    resolve(book);
                } else {
                    reject("Book not found");
                }
            }, 1000);
        });
    },
    listAvailableBooks: function() {
        return this.books.filter(book => book.available);
    }
};

 
async function manageLibrary() {
    print("Welcome to the " + library.name);
    print("Available Books:", library.listAvailableBooks());

    try {
        const book = await library.findBook(1);
        print(`Found book: ${book.title} by ${book.author}`);
    } catch (error) {
        console.error(error);
    }

     
    const newStaff = library.staff?.map(member => member.name).join(', ') ?? "No staff available";
    print("Library Staff: " + newStaff);

     
    const [firstBook, ...otherBooks] = library.books;
    print("First Book:", firstBook);
    print("Other Books:", otherBooks);

     
    if (firstBook.available) {
        const { handleBorrow } = await import('./borrow.js');  
        handleBorrow(firstBook.id);
    }
}

manageLibrary();
