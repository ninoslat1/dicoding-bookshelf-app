const buttonAdd = document.querySelector(".button-add");
const buttonClear = document.querySelector(".button-clear");
const formContainer = document.querySelector(".form-container");
const saveBook = document.getElementById("saveBook");
const updateBook = document.getElementById("updateBook");

// Accordion Component
buttonAdd.addEventListener("click", function () {
  buttonAdd.classList.toggle("active");
  saveBook.style.display = "block";
  updateBook.style.display = "none";
  formContainer.style.display == "block" ?
  formContainer.style.display = "none" : formContainer.style.display = "block"
});

// Web Storage Settings
const localStorageKey = "bookshelfApp";
let bookshelfApp = [];
const checkSupportedStorage = () => {
  return typeof Storage !== undefined;
};

if (checkSupportedStorage()) {
  if (localStorage.getItem(localStorageKey) === null) {
    bookshelfApp = []
  } else {
    bookshelfApp = JSON.parse(localStorage.getItem(localStorageKey))
  }
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp))
}

// Search Book by Title
const searchBook = (title) => {
  const result =  bookshelfApp.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  renderBooks(result);
};

// Add Book to Local Storage
const addBook = (Obj, localStorageKey) => {
  bookshelfApp.push(Obj);
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp));
};

// Update Book to Local Storage
const editBook = (book, Obj) => {
  const index = bookshelfApp.findIndex((b) => b.id === book.id);
  bookshelfApp[index] = Obj;
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp));
  renderBooks(bookshelfApp);
};

// Delete Book to Local Storage
const deleteBook = (book) => {
  bookshelfApp.splice(book, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp));
  renderBooks(bookshelfApp);
};

// Move to Finished Section
const finishedRead = (book) => {
  bookshelfApp[book].isComplete = true;
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp));
  renderBooks(bookshelfApp);
};

// Move to Book List
const unfinishedRead = (book) => {
  bookshelfApp[book].isComplete = false;
  localStorage.setItem(localStorageKey, JSON.stringify(bookshelfApp));
  renderBooks(bookshelfApp);
};

// Display Book to HTML
const unfinishedReadId = "unfinishedBook";
const finishedReadId = "finishedBook";

const renderBooks = (bookshelfApp) => {
  const books = bookshelfApp;

  const listUnfinished = document.getElementById(unfinishedReadId);
  const listFinished = document.getElementById(finishedReadId);

  listUnfinished.innerHTML = "";
  listFinished.innerHTML = "";

  for (let book of books.keys()) {
    const listGroupItem = document.createElement("article");
    listGroupItem.classList.add("list-group-item");

    // Book Detail
    const bookDetail = document.createElement("div");
    bookDetail.classList.add("book-detail");

    // Book Detail Child
    const bookTitle = document.createElement("b");
    bookTitle.innerHTML = books[book].title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("small");
    bookAuthor.innerHTML = "Author: " + books[book].author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("small");
    bookYear.innerHTML = "Year: " + books[book].year.toString();

    bookDetail.append(bookTitle, bookAuthor, bookYear);

    // Book Action
    const bookAction = document.createElement("div");
    bookAction.classList.add("book-action");

    // Book Action Child
    const buttonRead = document.createElement("button");

    const iconCheck = document.createElement("i");
    iconCheck.classList.add("fas", "fa-check");

    const iconEdit = document.createElement("i");
    iconEdit.classList.add("fas", "fa-edit");

    const iconUncheck = document.createElement("i");
    iconUncheck.classList.add("fas", "fa-undo");

    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fas", "fa-trash");

    if (books[book].isComplete) {
      buttonRead.classList.add("button-finish");
      buttonRead.append(iconUncheck);
      buttonRead.addEventListener("click", () => {
        unfinishedRead(book);
      });
    } else {
      buttonRead.classList.add("button-unfinish");
      buttonRead.append(iconCheck);
      buttonRead.addEventListener("click", () => {
        finishedRead(book);
      });
    }

    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("button-edit");
    buttonEdit.append(iconEdit);
    buttonEdit.addEventListener("click", () => {
      saveBook.style.display = "none";
      updateBook.style.display = "block";
      formContainer.style.display == "block" ? formContainer.style.display = "none" : formContainer.style.display = "block";
      

      const title = document.getElementById("title");
      const author = document.getElementById("author");
      const year = document.getElementById("year");
      const isComplete = document.getElementById("isComplete");

      title.value = books[book].title;
      author.value = books[book].author;
      year.value = books[book].year.toString();
      isComplete.checked = books[book].isComplete;
      
      updateBook.addEventListener("click", () => {
        const bookObj = {
          id: books[book].id,
          title: title.value,
          author: author.value,
          year: parseInt(year.value),
          isComplete: isComplete.checked,
        };
        // Check Input Field
        if (title.value == "" && author.value == "" && year.value == "") {
          Toastify({
            text: "Form can't be blank",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
        } 

        if(title.value == "" && author.value == "" && year.value){
          return Toastify({
            text: "Title or and author input can't be blank",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
         }
      
         if(title.value == "" && year.value == "" && author.value){
          return Toastify({
            text: "Title or and year input can't be blank",
            className: "info",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
         }
      
         if(year.value == "" && author.value == "" && title.value){
          return Toastify({
            text: "Year or and author input can't be blank",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
         }
      
         if(year.value == "" && author.value && title.value){
          return Toastify({
            text: "Year input can't be blank",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
         }
      
         if(author.value == "" && title.value && year.value){
          return Toastify({
            text: "Author input can't be blank",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
        }
      
        if(title.value == "" && author.value && year.value){
          return Toastify({
            text: "Title input can't be blank",
            style: {
              background: "linear-gradient(to right, #ffbf87, #eb4034)",
            }
          }).showToast()
        }
        
        if(title.value && author.value && year.value){
           // Run Edit Book Function to Save Updated Book in Local Storage
          editBook(books[book], bookObj);

          // Clear All Input Value
          const inputs = document.querySelectorAll("input");
          inputs.forEach((input) => (input.value = ""));

          // Hide Accordion Component
          formContainer.style.display = "none";
          
          renderBooks(bookshelfApp);
          Toastify({
            text: "Success, your book have been update",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast()
        }
      });
    });


    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("button-delete");
    buttonDelete.append(iconDelete);
    buttonDelete.addEventListener("click", () => {
      let confirmDelete = confirm(
        "Are you sure you want to delete the book '" + books[book].title + "'?"
      );
      if (confirmDelete) {
        deleteBook(book);
        Toastify({
          text: "Books has been deleted",
          style: {
            background: "linear-gradient(to right, #6bf3ff, #1f80ff)",
          }
        }).showToast()
      }
    });

    bookAction.append(buttonRead, buttonEdit, buttonDelete);

    // Append Book and Detail Action
    listGroupItem.append(bookDetail, bookAction);

    if (books[book].isComplete) {
      listFinished.append(listGroupItem);
    } else {
      listUnfinished.append(listGroupItem);
    }
  }
};

// Search Form Event Handler
const searchBookForm = document.getElementById("searchBook");
searchBookForm.addEventListener("submit", (e) => {
  const result = document.querySelector("#searchBookTitle").value;
  e.preventDefault();
  searchBook(result);
});

// Button Save Event Handler
saveBook.addEventListener("click", function () {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const year = document.getElementById("year");
  const isComplete = document.getElementById("isComplete");

  // put to object
  let Obj = {
    id: +new Date(),
    title: title.value,
    author: author.value,
    year: parseInt(year.value),
    isComplete: isComplete.checked,
  };

  // Check Input Field
  if (title.value == "" && author.value == "" && year.value == "") {
    Toastify({
      text: "Form can't be blank",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast();
  } 

  if(title.value == "" && author.value == "" && year.value){
    return Toastify({
      text: "Title or and author input can't be blank",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
   }

   if(title.value == "" && year.value == "" && author.value){
    return Toastify({
      text: "Title or and year input can't be blank",
      className: "info",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
   }

   if(year.value == "" && author.value == "" && title.value){
    return Toastify({
      text: "Year or and author input can't be blank",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
   }

   if(year.value == "" && author.value && title.value){
    return Toastify({
      text: "Year input can't be blank",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
   }

   if(author.value == "" && title.value && year.value){
    return Toastify({
      text: "Author input can't be blank",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
  }

  if(title.value == "" && author.value && year.value){
    return Toastify({
      text: "Title input can't be blank",
      style: {
        background: "linear-gradient(to right, #ffbf87, #eb4034)",
      }
    }).showToast()
  }
   
  if(author.value && title.value && year.value){
    //Run Add Book Function to Save Book to Local Storage
   addBook(Obj, localStorageKey);

  // Clear Input Value
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));

  // Hide Accordion Component
  formContainer.style.display = "none";

  renderBooks(bookshelfApp);
  Toastify({
    text: "Success, your book have been added",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast()
  }
});

// Button Clear Event Handler
buttonClear.addEventListener("click", () => {
  let confirmClearAll = confirm(
    "Are you sure you want to clean up all the books?"
  );

  if (confirmClearAll) {
    localStorage.clear();
    bookshelfApp = [];
    Toastify({
      text: "Books in Local Storage has been cleared",
      style: {
        background: "linear-gradient(to right, #6bf3ff, #1f80ff)",
      }
    }).showToast()
  }
  renderBooks(bookshelfApp);
});

const buttonReset = document.getElementById('resetField')
buttonReset.addEventListener('click', () => {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
  Toastify({
    text: "Input field has been reset",
    style: {
      background: "linear-gradient(to right, #6bf3ff, #1f80ff)",
    }
  }).showToast()
})

// displays all the data that have entered into the localStorage
window.addEventListener("load", function () {
  if (checkSupportedStorage) {
    renderBooks(bookshelfApp);
    Toastify({
      text: "Book has been loaded from Local Storage",
      style: {
        background: "linear-gradient(to right, #6bf3ff, #1f80ff)",
      }
    }).showToast()
  } else {
    Toastify({
      text: "Your browser don't support Local Storage",
      style: {
        background: "linear-gradient(to right, #6bf3ff, #1f80ff)",
      }
    }).showToast()
  }
});