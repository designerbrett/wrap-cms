// Define editable elements
const editableHeading = document.getElementById('editable-heading');
const editableParagraph = document.getElementById('editable-paragraph');
const editableFooter = document.getElementById('editable-footer');

// Add event listeners to editable elements
editableHeading.addEventListener('click', editElement);
editableParagraph.addEventListener('click', editElement);
editableFooter.addEventListener('click', editElement);

// Function to edit an element
function editElement(event) {
  // Get the element that was clicked
  const element = event.target;

  // Create an input field to edit the element's content
  const input = document.createElement('input');
  input.value = element.textContent;

  // Replace the element with the input field
  element.replaceWith(input);

  // When the input field loses focus, update the element's content and replace the input field with the element
  input.addEventListener('blur', function() {
    const updatedContent = input.value;
    const updatedElement = document.createElement(element.tagName);
    updatedElement.textContent = updatedContent;
    input.replaceWith(updatedElement);
  });
}
// Define the editable tag
const editableTag = "editable";

// Find all editable elements and make them editable
const makeEditable = () => {
  const editableElements = document.getElementsByTagName(editableTag);
  for (let i = 0; i < editableElements.length; i++) {
    const element = editableElements[i];
    element.contentEditable = true;
    element.addEventListener("blur", saveEdits);
  }
};

// Save the edits made to an editable element
const saveEdits = (event) => {
  const element = event.target;
  const content = element.innerHTML;
  const page = window.location.pathname; // Get the current page URL
  const data = {
    page,
    content,
  };
  saveData(data);
};

// Save the data to a JSON file
const saveData = (data) => {
  const page = data.page;
  const content = data.content;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `/${page}.json`, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Data saved successfully!");
    }
  };
  xhr.send(JSON.stringify({ content }));
};

// Load the data from a JSON file
const loadData = (page) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `/${page}.json`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      const content = data.content;
      const editableElements = document.getElementsByTagName(editableTag);
      for (let i = 0; i < editableElements.length; i++) {
        const element = editableElements[i];
        element.innerHTML = content;
      }
    }
  };
  xhr.send();
};

// Initialize the app
const init = () => {
  makeEditable();
  const page = window.location.pathname.substring(1); // Remove the leading slash
  loadData(page);
};

init();

