


let myLibrary = [];
let idList = [];


function Book(author, title, numOfPages, read, id) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(author, title, numOfPages, read) {
  let id = window.crypto.randomUUID();
  idList.push(id);
  let newBook = new Book(author, title, numOfPages, read, id);
  myLibrary.push(newBook);
}

addBookToLibrary("Moe", "JS-Odin", 245, true);
addBookToLibrary("kho", "Intro to the Accounting", 565, true);
addBookToLibrary("Oma", "It-System Foundation", 135, false);


console.log(myLibrary[0]);
console.log(myLibrary[1]);
console.log(myLibrary[2]);

function deleteBook(myLibrary) {

}


//--------------------------------------------------

const dialogElem = document.getElementById("dialog");
const showDialog = document.querySelector(".show");
const formSubmit = document.querySelector("#confirmBtn");
const cancelProcess = document.querySelector("#cancel");
const cards = document.getElementById("cards-container");
const form = document.getElementById('add-new-book-Form');


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

  const title = document.getElementById('book-title').value;
  const paragraph = document.getElementById('book-description').value;
  const price = document.getElementById('book-price').value;

  console.log(smallImg);
  console.log(bigImg);
  console.log(title);
  console.log(paragraph);
  console.log(price);

  dialogElem.close();

  const card = document.createElement("div");
  card.classList.add("card");
  cards.prepend(card);

  const picture = document.createElement("picture");
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  card.prepend(picture, cardContent);

  const img = document.createElement("img");
  img.src = smallImgURL;
  picture.prepend(img);

  const h1 = document.createElement("h1");
  h1.textContent = title;

  const p = document.createElement("p");
  p.textContent = paragraph;

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardContent.prepend(h1, p, cardInfo);

  const btn = document.createElement("button");
  btn.textContent = "Get Only By: ";

  const span = document.createElement("span");
  span.textContent = "$" + price ;
  btn.append(span);

  const cardRead = document.createElement("div");
  cardRead.classList.add("card-read");

  cardInfo.prepend(btn, cardRead);

  const label = document.createElement("label");
  label.for = "card-1";        // Add counter
  label.textContent = "Read";

  const inp = document.createElement("input");
  inp.type = "checkbox";
  inp.name = "read";
  inp.classList.add("read");
  inp.id = "card-1";          // Add counter

  cardRead.prepend(label, inp);




})


cancelProcess.addEventListener("click", () => {
  dialogElem.close();
});