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
