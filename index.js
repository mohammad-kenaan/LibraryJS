
const dialogElem = document.getElementById("dialog");
const showDialog = document.querySelector(".show");
const formSubmit = document.querySelector("#confirmBtn");
const cancelProcess = document.querySelector("#cancel");
const cards = document.getElementById("cards-container");
const favoriteCards = document.getElementById("favorite-cards");
const form = document.getElementById('add-new-book-Form');

let myLibrary = [];
let myBooks = [];


//------------Books display in Menu section---------
createDefaultBooks();
displayBooksAsCards(myLibrary);

//------------Add new Book---------

showDialog.addEventListener("click", () => {
  dialogElem.showModal();
  form.reset();
});

formSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const smallImg = document.getElementById('imgInput-1').files[0];
  const bigImg = document.getElementById('imgInput-2').files[0];
  const smallImgURL = URL.createObjectURL(smallImg);
  const bigImgURL = URL.createObjectURL(bigImg);
  const author = document.getElementById('book-author').value;
  const title = document.getElementById('book-title').value;
  const numOfPages = document.getElementById('book-num-of-pages').value;

  // Create your Book obj
  addBookToLibrary(author, title, numOfPages, smallImgURL, bigImgURL);
  cards.textContent = "";
  displayBooksAsCards(myLibrary)
  dialogElem.close();
})

cancelProcess.addEventListener("click", () => {
  dialogElem.close();
});

//------------Delete and Read - Unread Book---------
cards.addEventListener("click", (e) => {

  if (e.target.nodeName === "BUTTON" && e.target.textContent === "Delete") {
    const cardId = e.target.dataset.bookId;
    // Delete card  
    const cardIndexDelete = getElementIndex(myLibrary, cardId);
    deleteCard(myLibrary, cardIndexDelete);
    cards.textContent = "";
    displayBooksAsCards(myLibrary);

    // Read Card
  } else if (e.target.nodeName === "INPUT") {
    const checkbox = e.target;
    const indexCheckbox = getElementIndex(myLibrary, checkbox.id);
    if (isCardChecked(checkbox)) {
      addCardToMyBooks(myLibrary, indexCheckbox);
      myLibrary[indexCheckbox].checkedCard = true;

    } else {
      myLibrary[indexCheckbox].checkedCard = false;
      const indexUnCheckbox = getElementIndex(myBooks, checkbox.id);
      let x = deleteCard(myBooks, indexUnCheckbox);
      favoriteCards.textContent = "";
    }


    favoriteCards.textContent = "";
    myBooks.forEach(item => {
      item.displayMyFavoriteCards(item);
    });
  }

})

//------------My Tools---------
function Book(author, title, numOfPages, id, smallImgURL, bigImgURL, checkedCard) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  // this.read = read;
  this.id = id;
  this.smallImgURL = smallImgURL;
  this.bigImgURL = bigImgURL;
  this.checkedCard = this.checkedCard;
}

Book.prototype.displayMyFavoriteCards = function (item) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", "myBtn");
  favoriteCards.prepend(card);

  const picture = document.createElement("picture");
  card.append(picture);

  const img = document.createElement("img");
  img.src = item.smallImgURL;
  picture.append(img);

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.append(cardContent);

  const h1 = document.createElement("h1");
  h1.textContent = item.title;

  const p1 = document.createElement("p");
  p1.textContent = "Author: " + item.author;

  const p2 = document.createElement("p");
  p2.textContent = "Number of Pages: " + item.numOfPages;
  cardContent.append(h1, p1, p2);

  card.addEventListener("mouseenter", () => {
    console.log(item.info());
  });

}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.numOfPages} pages, Read: ${this.checkedCard}`;
}

function addBookToLibrary(author, title, numOfPages, smallImgURL, bigImgURL) {
  // Note Window crypto doesn't work on 10.0.0:5500 
  // its Work with localhost:5500 and any global url
  let id = window.crypto.randomUUID();
  let newBook = new Book(author, title, numOfPages, id, smallImgURL, bigImgURL);
  myLibrary.push(newBook);
}

function createDefaultBooks() {
  addBookToLibrary("Mohamad Kenaan", "JS-Odin", 245, "./assets/images/pic1-342.jpg", "./assets/images/pic1-1000.jpg");
  addBookToLibrary("Eyad Al-Khalidi", "Css-Odin", 140, "./assets/images/pic2-342.jpg", "./assets/images/pic2-1000.jpg");
  addBookToLibrary("Khaled Kenaan", "Mobile Application", 80, "./assets/images/pic3-342.jpg", "./assets/images/pic3-1000.jpg");
  addBookToLibrary("Omar Kenaan", "Information Technology", 180, "./assets/images/pic4-342.jpg", "./assets/images/pic4-1000.jpg");
  addBookToLibrary("Mohamad Kenaan", "Web Development", 730, "./assets/images/pic5-342.jpg", "./assets/images/pic5-1000.jpg");
  addBookToLibrary("Mohamad Kenaan", "Intro to Arabic", 1730, "./assets/images/pic6-342.jpg", "./assets/images/pic6-1000.jpg");
  addBookToLibrary("Eyad Al-Khalidi", "Master Of Programming", 8730, "./assets/images/pic1-342.jpg", "./assets/images/pic1-1000.jpg");

}

function displayBooksAsCards(arrOfBooks) {
  arrOfBooks.forEach(item => {

    const card = document.createElement("div");
    card.classList.add("card");
    cards.prepend(card);

    const picture = document.createElement("picture");
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    card.prepend(picture, cardContent);

    const img = document.createElement("img");
    img.src = item.smallImgURL;
    picture.prepend(img);

    const h1 = document.createElement("h1");
    h1.textContent = item.title;

    const p1 = document.createElement("p");
    p1.textContent = "Author: " + item.author;

    const p2 = document.createElement("p");
    p2.textContent = "Number of Pages: " + item.numOfPages;

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    cardContent.prepend(h1, p1, p2, cardInfo);

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.dataset.bookId = item.id;


    const cardRead = document.createElement("div");
    cardRead.classList.add("card-read");

    cardInfo.prepend(btn, cardRead);

    const label = document.createElement("label");
    label.htmlFor = item.id;
    label.textContent = "Read";

    const inp = document.createElement("input");
    inp.type = "checkbox";
    inp.name = "is-read";
    inp.classList.add("read");
    inp.id = item.id;
    inp.checked = item.checkedCard;

    cardRead.prepend(label, inp);
    card.dataset.bookId = item.id;
  });
}

function getElementIndex(array, id) {
  let cardIndex;
  array.forEach((item, index) => {
    if (item.id === id) {
      cardIndex = index;
    }
  });

  return cardIndex;
}

function deleteCard(array, index) {
  if (index > -1) {
    array.splice(index, 1);
  }
}

function isCardChecked(checkbox) {
  return checkbox.checked;
}

function addCardToMyBooks(array, index) {
  myBooks.push(array[index]);
}


