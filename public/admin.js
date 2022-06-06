async function main() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  // Loop thru the list of books and render each book showing title and current quantity

  books.forEach(renderBook)

  function renderBook(book) {
    
    let newBook = document.createElement("div");
    // Create text field and add book title as value
    let bookTitle = document.createElement("text");
    bookTitle.textContent = book.title;

    // Create input area and button
    let quantityInputBox = document.createElement("input");
    let submitNewQuantity = document.createElement("button");

    // Update button properties
    submitNewQuantity.classList.add("submit");
    submitNewQuantity.textContent = "Save";
    submitNewQuantity.setAttribute("button-for", book.title);

    // Update quantity input box
    quantityInputBox.value = book.quantity;
    quantityInputBox.setAttribute("input-data-for", book.title);

    // Add text label, input box, and button to div
    newBook.append(bookTitle, quantityInputBox, submitNewQuantity);
    
    // Add div to document body
    document.body.append(newBook);
  }

  // Get the list of  all submit buttons and input areas

  let submitButtonsList = document.querySelectorAll(".submit");
  let inputAreasList = document.querySelectorAll("input");

  
  //  add event lister for each button
  submitButtonsList.forEach((button) => {
    button.addEventListener("click", updateBookQuantity);
  });
  

  // This function is called when submit button is clicked to update quantity value

  function updateBookQuantity() {

    let userEnteredQuantity;
    let bookObjectToBeUpdated;
    
    
    // Check all input areas and see if button is clicked for a given input area 
    inputAreasList.forEach((inputArea) => {
      if (
        inputArea.getAttribute("input-data-for") ===
        this.getAttribute("button-for")
      ) {
        userEnteredQuantity = inputArea;
      }
    });
    
    // Now pick the right book object to update based on which button is clicked 

    books.forEach((book) => {
      if (
        book.title === userEnteredQuantity.getAttribute("input-data-for")
      ) {
        bookObjectToBeUpdated = book;
      }
    });
    
    // Now  update the book with quantity entered by the user 
    
    fetch("http://localhost:3001/updateBook", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: bookObjectToBeUpdated.id,
        quantity: userEnteredQuantity.value,
      }),
    });
    
  }
  
}

main()