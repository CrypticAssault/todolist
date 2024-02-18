//variable for the button which will be clicked to append input to list
var addButton = document.getElementById("addItem");
//variable for the button to remove checked items from the list
var removeButton = document.getElementById("removeItems")
//variable for the input field where user types item to add to list
var input = document.getElementById("userInput");
//variable for the <ul> element for appending new list element
var ul = document.querySelector("ul");
//variable to count number of items in list
var numberOfListItems = ul.childElementCount;
// Get all the checkboxes in list
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
//sets empty array which will be used later in the code to remove checked items
var checkedItems = [];


// Call the function to load list items from local storage when the page loads
loadListFromLocalStorage();

//FUNCTION DECLARATION SECTION

function inputLength() {
    //returns the length of input. used later in the code to check that input is not empty
    return input.value.length;
}


function createListElement() {

    //creates a string for the label and for attribute name
    var taskNumber = "task" + (numberOfListItems + 1);
    numberOfListItems += 1;

    //creates a new list element and stores it in a variable
    var li = document.createElement("li");

    //creates a new element of input type and stores in a variable
    var newCheckBox = document.createElement("input");
    //assigns a type attribute of checkbox
    newCheckBox.type = "checkbox";
    //adds an ID of task4
    newCheckBox.id = taskNumber;
    //appends the checkbox to the list element which will be its parent element
    li.appendChild(newCheckBox);

    //creates a new label element and stores it in a variable
    var newLabel = document.createElement("label");
    //gives the label text content of the input value
    newLabel.textContent = input.value;
    //gives the label a for attribute with a value of task4 (remember .for is a reserved word in javascript so has to use htmlFor to reference this)
    newLabel.htmlFor = taskNumber;
    //appends the label to list element which will be its parent element
    li.appendChild(newLabel);

    //Adds the new list element under the <ul> element in the document
    ul.appendChild(li);

    //clears the input value once item is added to list
    input.value="";

}


function removeListElements() {
    //loops trough each item in the checkedItems array, targets the checkbox ID and removes the parent element (the <li> element)
    for (i = 0; i < checkedItems.length; i++) {
        document.getElementById(checkedItems[i]).parentNode.remove();

        //updates local storage with removed list items
        saveListToLocalStorage();
    }
    //clears the checkedItems array
    checkedItems = [];
}


function addListAfterClick() {
    //checks for inpt length, if input length is more than 0 it will run the createListElement function which will add an item to the list
    if (inputLength() > 0) {
        createListElement();
        //updates the checkboxes variable to contain the new list element
        checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Add event listener to each checkbox
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', itemChecked);
        });
        
        //updates local storage with added list item
        saveListToLocalStorage();
    }    
}

function addListAfterKeypress(KeyboardEvent) {
    //Does the exact same thing as above, but listens for keyboardevent. In this case the "Enter" key
    if (inputLength() > 0 && KeyboardEvent.key === "Enter") {
        createListElement();
        
        //updates the checkboxes variable to contain the new list element
        checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        // Add event listener to each checkbox
        checkboxes.forEach(function (checkbox) {
            checkbox.addEventListener('change', itemChecked);
        });

        //updates local storage with added list item
        saveListToLocalStorage();

     }
}

// Function to add styling to checked item
function itemChecked() {
    var label = document.querySelector('label[for="' + this.id + '"]');
    if (this.checked) {
        //adds the class "completed" to label
        label.classList.add("completed");
        //pushes the task-id to checkedItems array so it can be removed using the remove button
        checkedItems.push(this.id);
    } else {
        label.classList.remove("completed");
        // Find the index of the item you want to remove
        var indexToRemove = checkedItems.indexOf(this.id);
        //removes task-id from the checkedItems array if checkbox is untoggled
        checkedItems.splice(indexToRemove, 1);
    }
};

// Function to save list items to local storage
function saveListToLocalStorage() {
    // Store the inner HTML of the <ul> element in local storage
    localStorage.setItem("listItems", ul.innerHTML);
}

// Function to load list items from local storage
function loadListFromLocalStorage() {
    // Retrieve the inner HTML of the <ul> element from local storage
    var storedListItems = localStorage.getItem('listItems');
    if (storedListItems !== null) {
        // Set the inner HTML of the <ul> element to the stored value
        ul.innerHTML = storedListItems;

        // Re-attach event listeners to the checkboxes
        checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', itemChecked);
        });
    }
}



//EVENT LISTENERS

// adds eventlistener to button on click and runs a function to add item from user input
addButton.addEventListener("click", addListAfterClick);

//does the same thing as the above, just listening for the enter key instead of the button (listens on the input, not the button)
input.addEventListener("keydown", addListAfterKeypress);

// Add event listener to each checkbox
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', itemChecked);
});

//removes all checked items when removeButton is clicked
removeButton.addEventListener("click", removeListElements);
